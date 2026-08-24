import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    password:{
        type: String,
        // maxLength:[16,"max password length 16"],
        // minLength:[8,"min password length 8"],
        require: true
    }   ,
    isVerified:{
        type : Boolean,
        default : false
    } 
})

const userModel = mongoose.model(`users`, userSchema)
export default userModel