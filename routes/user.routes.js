import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    res.send({messahe: "Hit the /route in user."})
})


userRouter.get("/:id", async (req, res) => {
    res.send({messahe: "Hit the /route in user."})
})

export default userRouter;