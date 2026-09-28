import mongoose, { Types } from "mongoose";


const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        require: true
    },
    email:{
        type : String,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
    },
    isVerify:{
        type: Boolean,
        default:false
    }
},{timestamps:true})

const userModel = mongoose.model("user",userSchema)
export default userModel