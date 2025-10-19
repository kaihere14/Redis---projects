import {Router} from "express"
import { otpGen, verifyOtp } from "../controllers/otp.controller.js"

const route = new Router()

route.post("/newOtp",otpGen)
route.post("/verifyOtp",verifyOtp)

export default route