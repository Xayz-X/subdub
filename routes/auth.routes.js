import { Router } from "express";
import authModel from "../models/auth.model.js"; 

const authRouter = Router()

authRouter.post("/register", async (req, res) => {
    const {name, password, email} = req.body;
    const userExist = await authModel.findOne({email});

    if (userExist){
        return res.status(400).json({message: `User already esist with ${email} email address.`});
    }
    const newUser = await authModel.insertOne({name, email, password});
    res.status(200).json({...newUser._doc});
})


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