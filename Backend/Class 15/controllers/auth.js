import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { sendOTPTemplate } from "../templates.js"
import UserModel from "./models/User.js"
import bcrypt from "bcryptjs"
import { setServers } from "node:dns/promises"
const PORT = process.env.PORT || 5000
setServers(["8.8.8.8", "1.1.1.1"])
dotenv.config()


export const signUpController = async(request,response) => {
     try {
    
            const body = request.body
            const { email, fullName, password } = body
    
            if (!email || !password || !fullName) {
                return response.json({
                    message: "required values are missing",
                    status: false
                })
            }
    
            // check user email 
            const user = await UserModel.findOne({ email })
            if (user) {
                return response.json({
                    message: "email address already hai hamary pass",
                    status: false
                })
            }
    
            const hashPassword = await bcrypt.hash(password, 10)
            const userObj = {
                email,
                fullName,
                password: hashPassword
            }
    
            await UserModel.create(userObj)
    
            const transporter = nodemailer.createTransport({
                service: process.env.SMTP_SERVICE,
                auth: {
                    user: process.env.SMTP_USER_EMAIL,
                    pass: process.env.SMTP_APP_PASS
                },
            })
    
            const otp = Math.floor(100000 + Math.random() * 900000);
            const mailOptions = {
                from: process.env.SMTP_USER_EMAIL,
                to: userObj.email,
                subject: 'OTP VERIFICATION',
                html: sendOTPTemplate(userObj, otp)
            }
    
            transporter.sendMail(mailOptions, (error, success) => {
                if (error) {
                    console.log(`email send error`, error.message)
                } else {
                    console.log(`email send success`, success.response)
                }
            })
    
            response.json({
                message: "user signUp successfully",
                status: true
            })
        } catch (error) {
            response.json({
                message: error.message || "something went wrong",
                status: false
            })
        }
    
}

export const loginController = async(request,response) => {
try {

        const body = request.body
        const { email, password } = body

        if (!email || !password) {
            return response.json({
                message: "required values are missing",
                status: false
            })
        }

        // check user email 
        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.json({
                message: "email address not found",
                status: false
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)


        if (!comparePassword) {
            return response.json({
                message: "email address or password not match nikal jao!",
                status: false
            })
        }

        if (!user.isVerified) {
            return response.json({
                message: "email address is not verified! Please verify your email address. check your Inbox jaaa bhai email verify krly",
                status: false
            })
        }

        response.json({
            message: "user login successfully",
            status: true,
            data: user
        })
    } catch (error) {
        response.json({
            message: error.message || "something went wrong",
            status: false
        })
    }
}

