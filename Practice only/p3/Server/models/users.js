import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName:{
       type: String,
    //    required: true,
       trim:true
    },
    email:{
        type: String,
        unique: true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    emailVerificationToken:{
        type: String,
        default: undefined,
        select: false
    },
    emailVerificationExpires:{
        type: Date,
        default:undefined,
        select:false
    },
    otpHash:{
        type:String,
        default:undefined,
        select:false,
    },
    otpExpireAt:{
        type:Date,
        default:undefined,
        select:false,
    },
    otpAttempts:{
        type:Number,
        default:0,
        select:false,
    }

},{timestamps:true})
const userModel = mongoose.model("Users",userSchema)
export default userModel