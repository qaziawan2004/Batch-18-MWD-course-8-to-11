import express from "express"
import mongoose  from "mongoose"
import cors from "cors"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import authMiddeleware from "./middleware/authMiddleware.js"
import {setServers} from "node:dns/promises"
import userModel from "./models/users.js"
import transporter from "./Config/mailer.js"
setServers(["8.8.8.8","0.0.0.0"])

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT||3000

const URI= process.env.MONGODB_URI
mongoose.connect(URI)
.then(()=> console.log(`MongoDB Connected!`))
.catch((error)=> console.log(`MongoDB URI Error!`,error.message)
)


app.get("/", async(req,res)=>{
    res.json(`Welcome to Homepage!`)
})
app.post("/api/signup" , async(req,res)=> {
try {
    const {fullName,email,password,confPassword} = req.body
console.log("body",req.body);

if (!fullName|| !email || !password || !confPassword) {
    return res.status(400).json({
        status: false,
        message: `Required fields not available`,
        data:null
    })
}
if (password !== confPassword) {
    return res.status(400).json({
        status:false,
        message:`password and confirm password are not matching`,
        data: null
    })
}
const existingUser = await userModel.findOne({email}).select("+password");
if(existingUser) {
    return res.status(400).json({
        status:false,
        message:`User email already exist`,
        data:null
    })
}

const hashedPassword = await bcrypt.hash(password,10)
    // console.log(hashedPassword);
    
const newUser = await userModel.create({
    fullName,
    email,
    password:hashedPassword,
})

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: newUser.email,
    subject: "Welcome! to Our ModernCrud",
    text: `Hello ${newUser.fullName},your account was created successfully!`,
    html:
    `<h2>Welcome ${newUser.fullName}!</h2>
    <p>Your Account has been created Successfully</p>
    <p>Thank you for joining us!</p>`,
});
console.log("Welcome Email Sent Successfully!");

res.status(201).json({
    status:true,
    message: `Signup Successfull`,
    data:{
     id : newUser._id,   
     fullName: newUser.fullName,
     email: newUser.email
    }
    
})
} catch (error) {
 console.log("Signup Error!",error.message);
    res.status(500).json({
        status:false,
        message:`Signup Failed`,
        data:null
    })
}
})

app.post("/api/login" , async(req,res)=> {
try {
    const {email,password} = req.body
console.log("body",req.body);
if(!email || !password){
    return res.status(400).json({
        status:false,
        message:`Required fields not found!`,
        data:null
    })
}

const currentUser = await userModel.findOne({email}).select("+password")

if(!currentUser){
  return res.status(401).json({
        status:false,
        message:`Wrong credentials`,
        data:null
    })
} 
const comparePassword = await bcrypt.compare(password,currentUser.password)

if(!comparePassword){
    return res.status(401).json({
        status:false,
        message:`Invalid email or password`,
        data: null
    })
}

    const jwtToken = jwt.sign(
        {
            id: currentUser._id,
            email:currentUser.email,
        }
        ,process.env.JWT_SECRET_KEY,
        {expiresIn :"1d"}
    )
res.status(200).json({
    status:true,
    message: `Logged in Successfull`,
    data:{
        id:currentUser._id,
        fullName:currentUser.fullName,
        email:currentUser.email,
        token:jwtToken,
    }
})
} catch (error) {
  console.log("Login Error", error.message)
    res.status(500).json({
        status:false,
        message:`Login server breach!`,
        data:null
    })
}

} )

// api for OtpVerify
app.post("/api/otpVerify", async(req,res) => {
    
})

// api for admin
app.get("/api/admin",async(req,res)=> {
await res.json(`Welcome admin!`)
})

// api for HR
app.get("/api/HR",async(req,res)=>{
    await res.json(`Welcome HR!`)
})

// api for Employees
app.get("/api/Employee", async(req,res) => {
    await res.json(`Welcome Employee!`)
})
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`)
)