import express from "express";
import "dotenv/config";
import otp from "./routes/otp.routes.js";


const app = express();
app.use(express.json())
app.use("/api/otp",otp)
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
