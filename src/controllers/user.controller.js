const userService = require('../services/user.service');
class userController {
    static async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            const data = await userService.verifyOtp({ email, otp });
            return res.status(200).json(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    static async getStatics(req, res) {
        try {
            return res.status(200).json({
                message: await userService.getStatics(),
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    static async getMethods(req, res) {
        try {
            return res.status(200).json({
                message: await userService.getMethods(),
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async register(req, res) {
        try {
            const { username, password, email } = req.body;
            const data = await userService.register({
                username,
                password,
                email,
            });
            if (data.status === 400) {
                return res.status(data.status).json(data.message);
            } else if (data.status === 201) {
                return res.status(data.status).json(data);
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json(error);
        }
    }
}

module.exports = userController;
