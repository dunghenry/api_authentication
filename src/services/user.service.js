'use strict';
const otpGenerator = require('otp-generator');
const User = require('../models/user.model');
const otpService = require('./otp.service');
const Otp = require('../models/otp.model');
const bcrypt = require('bcrypt');
class userService {
    #email = '';
    #password = '';
    #username = '';
    static async getStatics() {
        return User.getStatics();
    }
    static async getMethods() {
        const user = new User();
        return user.getMethods();
    }
    static async setData({ email, password }) {
        return { email, password };
    }
    static async verifyOtp({ email, otp }) {
        try {
            const otpHolder = await Otp.find({ email });
            if (!otpHolder.length) {
                return {
                    status: 404,
                    message: 'Expried OTP',
                };
            }
            const lastOtp = otpHolder[otpHolder.length - 1];
            const isValidOtp = await otpService.validOtp({
                otp,
                hashedOtp: lastOtp.otp,
            });
            if (!isValidOtp) {
                return {
                    status: 401,
                    message: 'Invalid OTP',
                };
            }
            if (isValidOtp && email === lastOtp.email) {
                await Otp.findOneAndDelete({ email });
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(
                    userService.password,
                    salt,
                );
                //console.log(userService.username, userService.password, hashedPassword);
                const newUser = new User({
                    email,
                    password: hashedPassword,
                    username: userService.username,
                });
                const savedUser = await newUser.save();
                const { password: selectPassword, ...others } = savedUser._doc;
                return {
                    status: 201,
                    message: 'Created user successfully!',
                    user: others,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }
    static async register({ email, password, username }) {
        const user = await User.findOne({ email: email });
        if (user) {
            return {
                status: 400,
                message: 'Email already exists!',
            };
        } else {
            // const testOtp = Math.floor(Math.random() * (999999 - 100000) + 100000);
            // const otp = testOtp.toString();
            const otp = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log(otp);
            userService.password = password;
            userService.username = username;
            this.email = email;
            const insertedOtp = await otpService.insertOtp({ email, otp });
            return {
                status: 201,
                message:
                    insertedOtp === 1
                        ? 'Created otp successfully!'
                        : 'Created otp failed!',
            };
        }
    }
}

module.exports = userService;
