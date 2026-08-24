import cloudinary from "./Config/claudinary.js"
import authMiddleware  from "./middleware.js"
import { generateOTP } from "./utils.js"
import { sendOtpTemplate, welcomeUserTemplate } from "./template.js"
import OtpModel from "./models/otpSchema.js"
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors"
import userModel from "./models/userSchema.js"
import todoModel from "./models/TodoSchema.js"
import { setServers } from "node:dns/promises"
// import compass from "compass"
import nodemailer from "nodemailer"
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
setServers(['8.8.8.8', '1.1.1.1']);

// md-pass:DZxt40ZvAFlm63Mg
const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
    .then(() => {
        console.log(`MongoDb Connected!`)

    }).catch((error) => {
        console.log(error, `MongoDb Connection Error!`)

    })


app.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        console.log(req.body)


        if (!fullName || !email || !password) {
            res.json({
                message: "Required fields are empty!",
                status: false
            })
            return
        }

        const userData = await userModel.findOne({ email })
        console.log(userData, "data")

        if (userData) {
            res.json({
                message: `User Email Already exist`,
                status: false
            })
            return
        }

        const hashPass = await bcrypt.hash(req.body.password, 10)
        const obj = {
            ...req.body,
            password: hashPass
        }

        const userCreated = await userModel.create(obj)

        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER_EMAIL,
                pass: process.env.SMTP_PASS
            },
        })

        const otp = generateOTP();
        const mailOptions = {
            from: process.env.SMTP_USER_EMAIL,
            to: email,
            subject: `OTP VERIFICATION`,
            html: sendOtpTemplate(fullName, otp)
        }
        try {
         
        const file = await transporter.sendMail(mailOptions, (error, success) => {
            if (error) {
                console.log(`email send error`, error.message)

            } else {
                console.log(`email send success`, success.message);

            }   
        })

        } catch (error) {
         console.log("Email send error:", error.message)   
        }
        const OTPExpiretime = new Date(
            Date.now() + 10 * 60 * 1000
        );
        const otpObj = {
            otp: otp,
            email: obj.email,
            expireAt: OTPExpiretime
        }
        await OtpModel.create(otpObj)
        // const token = jwt.sign({
        //     _id: userCreated._id,
        //     email: obj.email

        // }, process.env.JWT_SECRET_KEY)

        res.json({
            message: `User Signup Successfully!👍🏻`,
            status: true
        })

    } catch (error) {
        res.json({
            message: `Something went wrong at 54`,
            status: false
        })
    }

})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        if (!email || !password) {
            res.json({
                message: `Required fields are Missing!`,
                status: false
            })
            return
        }

        const userData = await userModel.findOne({ email })
        console.log(userData, `data`)

        if (!userData) {
            res.json({
                message: `Following User Not Found!`,
                status: false
            })
            return
        }
        const compPass = await bcrypt.compare(password, userData.password)
        if (!compPass) {
            return res.json({
                message: `User Credential Not Match!`,
                status: false
            })
        } else if (!userData.isVerified) {
            return res.json({
                message: `email not verified. Please verify your email. Check your inbox`,
                status: false
            })

        } else {
            const jwtToken = jwt.sign({
                _id: userData._id,
                fullName: userData.fullName,
                email: userData.email
            }, process.env.JWT_SECRET_KEY
            )
            console.log("jwtToken", jwtToken);

            res.json({
                message: `User Logged in Successfully!`,
                status: true,
                user: userData,
                token : jwtToken
            })
        }

    } catch (error) {
        res.json({
            message: `Something went wrong 99`,
            status: false
        })
    }


})

//Otp section
app.post("/otp-verify", authMiddleware, async (request, response) => {
    try {
        const { otp } = request.body
        const email = request.userEmail
        // const userId = request.userId


        // 2. create filter obj for filteration
        const filter = {
            otp,
            email,
            isUsed: false
        }

        // 3. find OTP
        const findOTP = await OtpModel.findOne(filter).sort({ createdAt: -1 })
        console.log("findOTP", findOTP)

        // 4. check otp exist or not according over condition
        if (!findOTP) {
            return response.json({
                message: "Invalid OTP",
                status: false
            })
        }

        //5. check OTP expire time
        const currentTime = Date.now()
        console.log("currentTime", currentTime < findOTP.expireAt)

        //    6. check current time or expire time
        if (currentTime < findOTP.expireAt) {
            console.log("VERIFY OTP")
            // 1. user collection update isVerified true
            await userModel.findByIdAndUpdate(request.userId, { isVerified: true })

            // 2. otp collection isUsed  true
            findOTP.isUsed = true
            await findOTP.save()
            return response.json({
                message: "OTP Verify true",
                status: true
            })

        } else {
            return response.json({
                message: "OTP EXPIRED",
                status: false
            })
        }

    } catch (error) {
        response.json({
            message: error.message || "something went wrong",
            status: false
        })
    }
})



app.post("/reset-otp", authMiddleware, async (request, response) => {
    try {
        const email = request.userEmail
        const userId = request.userId


        //  1.  create OTP
        const otp = generateOTP()

        // 2. get request user
        const Obj = await userModel.findById(userId)

        // create email transporter 
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER_EMAIL,
                pass: process.env.SMTP_PASS
            },
        })

        // create mail options
        const mailOptions = {
            from: process.env.SMTP_USER_EMAIL,
            to: email,
            subject: 'OTP VERIFICATION',
            html: sendOtpTemplate(fullName, otp)
        }
        // email send
        transporter.sendMail(mailOptions, async (error, success) => {
            // if error 
            if (error) {
                return response.json({
                    message: error.message,
                    status: false
                })
                console.log(`email send error`, error.message)
            }
            // successfully email sent
            else {
                const OTPExpiretime = new Date(
                    Date.now() + 10 * 60 * 1000
                );
                const otpObj = {
                    otp: otp,
                    email: email,
                    expireAt: OTPExpiretime
                }
                // save otp 
                await OtpModel.create(otpObj)
                return response.json({
                    message: "reset otp successfully!",
                    status: true
                })
            }
        })



    } catch (error) {
        response.json({
            message: error.message || "something went wrong",
            status: false
        })
    }
})








app.post("/send-email", (request, response) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE, //gmail
            auth: {
                user: process.env.SMTP_USER_EMAIL,
                pass: process.env.SMTP_APP_PASS //app password
            }
        });


        const mailOptions = {
            from: process.env.SMTP_USER_EMAIL,
            to: process.env.SMTP_USER_EMAIL,
            subject: 'Welcome User',
            html: welcomeUserTemplate()
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                return response.json({
                    messagae: `Error sending email: ${error.message}`,
                    status: false
                })
            }

            response.json({
                messagae: `Email sent:  ${info.response}`,
                status: true
            })

        });



    } catch (error) {
        response.json({
            status: false,
            message: error.message
        })
    }
})




// res.end("Hello User!") ;

app.get("/get-single-user/:id", async (req, res) => {
    try {
        const userId = req.params.id
        console.log(userId)

        const userData = await userModel.findById(userId)

        res.json({
            message: `Single User Fetched`,
            status: true,
            data: userData
        })

    } catch (error) {
        res.json({
            message: error.message && `Something went wrong 132`,
            status: false,
            data: null
        })
    }


})

// Todo Part
// todo creation
app.post("/todo", async (req, res) => {
    try {
        const body = req.body
        await todoModel.create(body)

        res.json({
            message: `Todo Created Successfully!`,
            status: true
        })
    } catch (error) {
        res.json({
            message: error.message || `Something went wrong 154`,
            status: false
        })
    }

})

// todo updation
app.get("/todo", async (req, res) => {
    try {
        const todoId = req.query.todoId
        if (todoId) {
            const data = await todoModel.findById(todoId)

            res.json({
                message: `Single todo Fetched!`,
                status: true,
                data: data
            })
        } else {
            const data = await todoModel.find({})
            res.json({
                message: `All todo fetched!`,
                status: true,
                data: data
            })
        }

    } catch (error) {
        res.json({
            message: error.message || `Something went wrong 184`,
            status: false

        })
    }
})


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))