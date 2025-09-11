import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers); // need admin role; not implemented role base system yet
userRouter.get("/me", authorize, getUser);
userRouter.patch("/me", authorize, updateUser);

export default userRouter;
