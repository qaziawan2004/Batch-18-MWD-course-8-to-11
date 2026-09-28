import express from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { welcomeUserTemplate } from "./templates.js"
import mongoose from "mongoose"
import { setServers } from "node:dns/promises"
import signUpController, { loginController } from "./controllers/auth.js"
import { AuthRouter } from "./routes/auth.js"
import routes from "./routes/index.js"
const PORT = process.env.PORT || 5000
setServers(["8.8.8.8", "1.1.1.1"])
dotenv.config()


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URI = process.env.MONGODB_URI
mongoose.connect(URI)
    .then(() => console.log(`mongoDB COnnected!`))
    .catch(err => console.log(`MongoDb error: ${err.message}`))

    // api/auth/login

    app.use("/api/auth",AuthRouter)


    return





app.post("/api/signup", signUpController)

app.post("/api/login", loginController)



app.post("/api/send-email", routes)



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

