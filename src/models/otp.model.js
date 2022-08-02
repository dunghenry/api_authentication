const { Schema, model } = require('mongoose');
const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    create: {
        type: Date,
        default: Date.now,
        index: {
            expires: 20
        }
    }
}, {
    collection: 'otp',
})

const Otp = model('Otp', otpSchema);
module.exports = Otp;