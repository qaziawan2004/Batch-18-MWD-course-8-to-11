import express from "express"
import mongoose from "mongoose"
const app = express();
import stdModel from "./models/studentSchema.js"
const URI = "//<db_username>:<db_password>@cluster0.aerkkon.mongodb.net/"

mongoose.connect(())

app.use(express.json())
const PORT = 5000;

app.get("/", (request,response)=>{
    response.send(`Welcome to Batch 18...`)

})

// app.put("/create-student",(request,response)=>{
// response.send(userObj)
// console.log(response.body)

// })
app.post("/create-student",(request,response)=>{
    const userObj = response;

response.send(`Student created!`)
console.log(request.body)

})

app.get("/get-all-Std", async(request,response)=>{

console.log("get-all-std")
const filter = {
    // firstName : "Jaffar",
    email:"amanjaffer50@gmail.com"
}
const stdData = await stdModel.find(filter)

response.send({
    message: "fetch successfully!",
    data: stdData
})

})

app.listen(PORT,()=>console.log(`Server Running on http.localhost${PORT}`)
)