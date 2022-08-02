const User = require('../models/user.model');
class userService {
    static async getStatics() {
        return User.getStatics();
    }
    static async getMethods() {
        const user = new User();
        return user.getMethods();
    }
    static async createUser({ email, password, username }) {
        const user = await User.findOne({ email: email });
        if (user) {
            return {
                status: 400,
                message: 'Email already exists!',
            }
        }
        else {
            const newUser = new User({
                email,
                password,
                username
            });
            const savedUser = await newUser.save();
            const { password: selectPassword, ...others } = savedUser._doc;
            return {
                status: 201,
                message: 'Created user successfully!',
                user: others
            }
        }

    }
}

module.exports = userService;