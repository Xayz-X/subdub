import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import authModel from "../models/auth.model.js";

const registerNewUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;
    const existingUser = await authModel.findOne({ email });

    if (existingUser) {
      const error = new Error(`User already exist with ${email} email address`);
      error.statusCode = 409;
      throw error;
    }

    // Hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await authModel.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // Sign JWT token
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token: token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (!user) {
      const error = new Error(`User does not exist`);
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error(`Invalid password`);
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: `User signed in successfully`,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer`)
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({
        success: false,
        message: `Not authorized`,
        error: `Token is not available in the headers`,
      });
    }

    // ignore token expiry date, as it is a refresh token request the old token maybe expired
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    // JWT is valid but maybe user deleted from database, to check that get the user from database
    const user = await authModel.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        message: `Not authorized`,
        error: `User does not exist`,
      });
    }
    // Generate new JWT token
    const newToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
};

export { registerNewUser, loginUser, refreshToken };
