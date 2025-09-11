import { Router } from "express";
import {
  registerNewUser,
  loginUser,
  refreshToken,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerNewUser);
authRouter.post("/login", loginUser);
authRouter.get("/refresh", refreshToken);

export default authRouter;
