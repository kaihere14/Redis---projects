import { User } from "../model/user.model.js";
import { nanoid as n } from 'nanoid';
import { redis } from "../middlewares/rateLimit.js"; 


export const login = async(req,res)=>{
    try {
        const {email,password}= req.body
    if(!email || !password){
        return res.status(404).json({message:"all field are required"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"no user found "})
    }
    const verification = await user.comparePassword(password)
    if(!verification){
        return res.status(409).json({message:"Invalid Password"})
    }
    const id = n(16);
    const sessionId =await redis.hset(`session:${id}`,
        {
            email:email,
            name:user.fullName,
            ip:req.ip
        }
    )
    await redis.expire(`session:${id}`, 30 * 60); // 30 minutes
    const options = {
        httpOnly:true,
        sameSite:true
    }
    res.cookie("sessionId",id,options)
    return res.json({id})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
        
    }

}

export const logout= async(req,res)=>{
    const id = req.cookies.sessionId
    redis.del(`session:${id}`)
    return res.status(200).json({message:"logout success"})
}