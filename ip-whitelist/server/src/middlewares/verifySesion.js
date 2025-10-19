import { redis } from "./rateLimit.js";



export const verifySession = async (req,res,next)=>{
    const id = req.cookies.sessionId
    const session = await redis.hget(`session:${id}`,"ip")
    if(!session || session !==req.ip){
        return res.status(404).json({message:"Unauthorized access"})
    }
    next()
}