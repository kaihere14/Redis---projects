import express from "express";

import { getProducts } from "./api/product.js";
import { rateLimit } from "./src/middleware/rateLimit.js";
const app = express();
const port = 3300;


app.use(rateLimit)

app.get("/", (req, res) => {
  res.send("Hello World!");
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
