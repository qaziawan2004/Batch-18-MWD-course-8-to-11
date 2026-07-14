import fs from "fs"
import http from "http"
import {create} from domain
const PORT = 3000;

const server = http.createServer((request,response)=>{
console.log(request.url);
if (request.url === "/") {
    response.end("Server Runnig")
}else if(request.url === "/create-user"){
    response.end(`User created! `)
}else{
    response.end(`404 not found`)
}
})





server.listen(PORT, ()=>console.log(`server running on http://localhost${PORT}`))









