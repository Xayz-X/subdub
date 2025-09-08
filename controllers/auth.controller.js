import mongoose from "mongoose";
import authModel from "../models/auth.model.js";

const registerUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        const userExist = await authModel.findOne({email})
        if (userExist) {
            return res.status(400).json({message: `A user already exist with the ${email} email address.`})
        }
        const newUser = await authModel.insertOne({name, email, password})

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            statusCode: 201,
            result: newUser._doc
        })
    } catch (error) {
        console.log(`Error: ${error}`)
        await session.abortTransaction();
        next(error);
    }
}

export {registerUser};