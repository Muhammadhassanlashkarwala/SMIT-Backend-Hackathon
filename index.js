

import express from "express";
import cors from "cors";
import { connectDB } from "./lib/dbConnect.js";
import authRouter from "./routes/user.js";
import userRouter from "./routes/user.js";

let app = express();
let port = 4000;

app.use(cors());
app.use(express.json())
app.use("/api/auth", userRouter)
app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`);
})