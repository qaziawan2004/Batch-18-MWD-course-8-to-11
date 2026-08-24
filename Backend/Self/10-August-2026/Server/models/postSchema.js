import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
image:{
    type : String,
    required: true
},
caption :{
    type : String,
    required : true,
    trim : true
},
likes:[
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
]


})

const postModel = mongoos.model("post",postSchema)
export default postModel