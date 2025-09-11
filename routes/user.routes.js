import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers); // need admin role; not implemented role base system yet
userRouter.get("/:id", getUser); // need admin role; not implemented role base system yet
userRouter.get("/me", authorize, getUser);
userRouter.patch("/me", authorize, updateUser);
userRouter.delete("/me", authorize, deleteUser);

export default userRouter;
