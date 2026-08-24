import mongoose from "mongoose"

const OtpSchema = new mongoose.OtpSchema({
    OTP: {
    type: String
    },
    fullName :{
        type: String
    }

})
const OtpModel = mongoose.OtpModel(OTP,OtpSchema)
export default OtpModel