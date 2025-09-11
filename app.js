import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/database.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

// app initialize
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// routers
app.use("/auth", authRouter);
app.use("/users", userRouter);

// custom error middleware
app.use(errorMiddleware);

// health check route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// server start
app.listen(PORT, async () => {
  console.log(`Server is listening on: https://localhost:${PORT}`);
  await connectToDatabase();
});
