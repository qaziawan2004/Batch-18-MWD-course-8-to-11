import mongoose from "mongoose"
const todoSchema = new mongoose.schema({
    title:{
        type : String,

    },
    description:{
        type: String,
        default: `No Description found here!`
    },
    priority:{
        type: String,
        default:`Low`
    }
},{timestamps:true})
const todoModel = mongoose.model("todos", todoSchema)
export default todoModel