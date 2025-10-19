import { redis } from "../database/redis.js";

export const otpGen = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(404).json({ message: "Please enter a valid email" });
    }
    const number = Math.floor(100000 + Math.random() * 900000);
    const creatingOtp = await redis.hsetnx(`user:${email}`, "otp", number);
    if (!creatingOtp) {
        const otp = await redis.hget(`user:${email}`, "otp");
        return res.status(200).json({ message: `your otp is ${otp}` });
    }
    redis.expire(`user:${email}`, 60 * 5);
    return res.status(200).json({ message: `your otp is ${number}` });
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(404).json({ message: "Please enter a valid email/otp" });
    }
    const gettingOtp = await redis.hget(`user:${email}`, "otp");
    if (!gettingOtp) {
        return res.status(404).json({ message: `Please request for new otp` });
    }
    if (gettingOtp != otp) {
        return res.status(500).json({ message: `Invalid otp ` });
    }
    redis.del(`user:${email}`)
    return res.status(200).json({ message: `Verification completed` });

};
