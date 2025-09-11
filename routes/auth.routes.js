import { Router } from "express";
import { registerNewUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerNewUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", async (req, res) => {
  res.send({ message: "Not implemented yet" });
});

authRouter.post("/refresh", async (req, res) => {
  res.send({ message: "Not implemented yet" });
});

export default authRouter;
