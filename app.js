import express  from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/database.js";

const app = express();

app.use(express.json());

// auth router
app.use("/auth", authRouter)
app.use("/users", userRouter)


app.get("/", (req, res) => {
    res.send("Hello world!")
});

app.listen(PORT, async () => {
    console.log(`Server is listening on: https://localhost:${PORT}`)
    await connectToDatabase()
});

