import {Redis} from "ioredis";
import "dotenv/config"

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
})

export const rateLimit = async (req, res,next) => {
        const ip = req.ip
        let user =  await redis.incr(`user:${ip}`);
        if (user) {
            if(user===1){
                await redis.expire(`user:${ip}`,60);
            }
            if(user>11){
                return res.status(409).json({ message:"rate limit  exceeded wait 1 minute" })
            }
            if(user===11){
                await redis.expire(`user:${ip}`,60)
                return res.status(409).json({ message:"rate limit exceeded" })
            }
    
            next()
            
        }
    }
