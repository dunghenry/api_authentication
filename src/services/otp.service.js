'use strict';
const bcrypt = require('bcrypt');
const Otp = require('../models/otp.model');
class otpService {
    static async validOtp({ otp, hashedOtp }) {
        try {
            const isValidOtp = await bcrypt.compare(otp, hashedOtp);
            return isValidOtp;
        } catch (error) {
            console.log(error);
        }
    }
    static async insertOtp({ email, otp }) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedOtp = await bcrypt.hash(otp, salt);
            const newOtp = new Otp({
                email,
                otp: hashedOtp,
            });
            const savedOtp = await newOtp.save();
            return savedOtp ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = otpService;
