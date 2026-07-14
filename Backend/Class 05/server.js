import express, { response } from "express"
import fs from "fs"
import { json } from "stream/consumers"
const app = express()
const PORT = 3000

// body parser => express.json
app.use(express.json())

app.post("/signup",(request,response)=>{
    console.log("signup body ===>",request.body)
    fs.writeFileSync("users.txt","Hello World!")
   const userObj = request.body
    const isFileExist =  fs.existsSync("users.txt")
    // console.log("file",file);
    if(isFileExist){
        // already user ha
        // append user
    }else{
        // first user
        // 1.create file
        // 2.write user
            fs.writeFileSync("users.txt",JSON.stringify(userObj))
            response.send("User created!")
    }
// response.send("user Created!!")
})

app.put("/edit-user", (request,response)=>{
    console.log("request.body",request.body)
    const body = request.body
    const users = fs.readFileSync("users.txt","utf-8")
    const userExist = users.findIndex((obj) =>{
        if(obj.email === body.email){
            return true
        }
    })    

    if(userExist === -1){
        return response.send("user not found!")
    }
    const updatedObj = {
        ...users[userExist],
        ...body
    }
    console.log("userObj",userObj)
    userExist.splice(userExist,1,updatedObj)
    fs.writeFileSync("users.txt",JSON.stringify(users))
    
    


})

app.get("/",(request,response)=>{
response.send(`Batch 18 nodejs server .....`)
})



app.listen(PORT,()=>console.log(`server running on http://locahost:${PORT}`)
)