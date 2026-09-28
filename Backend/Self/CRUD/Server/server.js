import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { setServers } from "node:dns/promises"
import userModel from "./models/userSchema.js"
dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())

setServers(["8.8.8.8", "1.1.1.1"])

const URI = process.env.MONGODB_URI
mongoose.connect(URI)
    .then(() => console.log(`MongoDb Connected!👍🏻`))
    .catch((error) => console.log(`Something went wrong:${error.message}`))

app.post("/api/signup", async (req, res) => {
    try {

        let { fullName, email, password, confirmPassword } = req.body

        let userObj = {
            fullName,
            email,
            password,
            confirmPassword
        }
        if (!fullName || !email || !password || !confirmPassword) {
            res.json({
                message: "required fields are missing",
                status: false
            })
            return
        }
        const userData = await userModel.findOne({ email })
        if (userData) {
            res.json({
                message: `Following Email Aready Exist!`,
                status: false
            })
            return
        }
        const user = await userModel.create(userObj)
        if (user) {
            res.json({
                message: `Signup Successfull`,
                status: true,
                data: userData
            })
        }
    } catch (error) {
        res.json({
            message: `Something went wrong in catch`,
            status: false
        })
    }

})

app.post("/api/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            res.json({
                message: `Please enter email and password`,
                status: false
            })
            return
        }
        const userData = await userModel.findOne({ email })
        if (!userData) {
            res.json({
                message: `email not found`,
                status: false
            })
            return
        }
        if (req.body.password !== userData.password) {
            res.json({
                message: `wrong password`,
                status: false
            })
            return
        } else {
            res.json({
                message: `Logged in Successful`,
                status: true,
                data: userData
            })
        }

    } catch (error) {
        res.json({
            message: `something went wrong in login catch`,
            status: false
        })
    }
})

app.get("/get-single-user/:id", async (req, res) => {
    try {
        const userId = req.params.id

        const userData = await userModel.findById({ userId })

        res.json({
            message: `Single User Fetched`,
            data: userData,
            status: true
        })
    } catch (error) {
        res.json({
            message: error.message|| `something went wrong`,
            data : null,
            status:false
        })
    }


})




app.listen(PORT, console.log(`server running on http://localhost:${PORT}`))