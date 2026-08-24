import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

config

const PORT = process.env.PORT|| 4000

const app = express()
app.use(express.json())
app.use(cors())

app.get("/api/send-email",(req,res)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth:{
                user: process.env.SMTP_USER_EMAIL,
                pass: process.env.SMTP_USER_PASS
            }
        })
    } catch (error) {
        console.log(error)
    }

    try {
        
        const mail 


    } catch (error) {
        
    }




    // console.log(`send email`)
    // res.json({
    //     message:`Send Email`,
    //     status: true
    // })
    
})


app.listen(PORT,()=>console.log(`Server running on localhost:${PORT}`)
)


// http://localhost:4000/api/send-email