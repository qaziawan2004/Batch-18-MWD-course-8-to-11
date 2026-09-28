import express from "express"
import { AuthRouter } from "./auth"

const routes  = express.Router()

routes.use("/auth",AuthRouter)
routes.use("/otp",otpRouter)


export default routes