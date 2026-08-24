import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

    expireAt: {
        type: Date,
        required: true
    },
    isUsed: {
    type: Boolean,
    default: false
}
},{timestamps: true});

const OtpModel = mongoose.model("Otp", otpSchema);

export default OtpModel;