import mongoose from "mongoose";

const stdSchema  = new mongoose.Schema({
    firtName : String,
    lastName : String,
    age: Number,
    email: String

})



const stdModel =  mongoose.model("student", stdSchema)

export default stdModel
