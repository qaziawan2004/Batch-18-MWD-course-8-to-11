import mongoose from "mongoose"
const userSchema = new mongoose.schema({
    fullName:{
        type : String,

    },
    Email:{
        type: String
    },
    Password:{
        type: String
    }
},{timestamps:true})
const userModel = mongoose.model("users", userSchema)
export default userModel