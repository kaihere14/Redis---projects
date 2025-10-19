import { Router } from "express";
import { rateLimit } from "../middlewares/rateLimit.js";
import { login, logout } from "../controllers/user.controller.js";
import { verifySession } from "../middlewares/verifySesion.js";


const route = new Router()

route.post('/login',rateLimit,login)
route.post('/logout',rateLimit,verifySession,logout)

export default route