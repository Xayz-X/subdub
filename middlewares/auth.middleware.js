import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import authModel from "../models/auth.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer`)
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: `Not authorized`,
        error: `Token is not available in the headers`,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await authModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `Not authorized`,
        error: `User does not exist`,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Not authorized`,
      error: error.message,
    });
  }
};

export default authorize;
