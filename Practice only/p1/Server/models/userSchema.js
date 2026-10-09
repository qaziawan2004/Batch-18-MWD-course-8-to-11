import mongoose from "mongoose"

const userSchema = new mongoose.schema({
    fullName: String,
    Email : String,
    Password : String,
    confirmPassword: String
}) 
const userModel =  mongoose.model("users", userSchema)
export default userModel