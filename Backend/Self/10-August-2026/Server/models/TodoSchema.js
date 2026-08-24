import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
 title :{
        type : String
    },  
    desc :{
        type : String,
        default : `Coming soon`
    },
    priority : {
        type : String
    },
    dueDate : {
        type : String,
        default : new Date()
    },
    // createdAt :{
    //     type : Date,
    //     default : new Date()
    // }
},{timestamps: true})

const todoModel = mongoose.model("todo", todoSchema)
export default todoModel