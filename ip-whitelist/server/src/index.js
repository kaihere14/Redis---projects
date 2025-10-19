import express from "express";
import "dotenv/config"
import { connectDB } from "./database/index.js";
import { rateLimit } from "./middlewares/rateLimit.js";
import auth from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"




const app = express();
app.use(express.json())
app.use(rateLimit)
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user",auth)


connectDB().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`);
      });
})
.catch((error)=>{
    console.log(error)
})
