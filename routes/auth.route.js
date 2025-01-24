

import express from "express"
import { loginUser, signUpUser, signUpNewUser } from "../controllers/auth.controller.js";

let authRouter = express.Router()

authRouter.get("/login", loginUser)
authRouter.get("/signup", signUpUser)
authRouter.post("/signup", signUpNewUser)


export default authRouter;