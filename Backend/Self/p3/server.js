console.log("Hello World!!");
import { log } from "console"
import { create } from "domain";
import fs from "fs"


const createFile = (()=>{
 fs.writeFileSync("indexData", "hello bro!!")
})

