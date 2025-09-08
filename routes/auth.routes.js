import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/register", registerUser)

authRouter.post("/login", async (req, res) => {
    res.send({message: "Called sign-in route"});
})

authRouter.post("/logout",async (req, res) => {
    res.send({message: "Called sign-out route"});
})


authRouter.post("/refresh",async (req, res) => {
    res.send({message: "Called sign-out route"});
})


export default authRouter;