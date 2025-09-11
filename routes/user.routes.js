import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/role.middleware.js";

import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", authorize, adminMiddleware, getUsers);
userRouter.get("/:id", authorize, adminMiddleware, getUser);
userRouter.get("/me", authorize, getUser);
userRouter.patch("/me", authorize, updateUser);
userRouter.delete("/me", authorize, deleteUser);

export default userRouter;
