console.log("Jaffar Aman 100");

import http from "http"
import fs from "fs"
const PORT = 3000;

const server = http.createServer((request, response)=> {
console.log("request",request.url)
if(request.url=== "/"){
    response.end("server runing on http://localhost:${PORT} , Welcome to Batch 18 Server") 
}else if (request.url=== "/about"){
    response.end("About......")
}else if (request.url=== "/contact"){
    response.end("Contact......")
}else if(request.url=== "/create-user"){
    const userObj={
        email: "faizan@gmail.com",
        pass: 12345,
    }
    fs.writeFileSync("users.txt", JSON.stringify(userObj))
    response.end(JSON.stringify(userObj))
// response.end("Faizan User Created!")
}





})
server.listen(PORT , () => console.log(`server runing on http://localhost:${PORT}`))

// API stands for Application Progrming Interface