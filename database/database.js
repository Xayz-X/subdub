import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    `Database URI not found, Please define it in .env.${NODE_ENV}.local file.`
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to the Database in ${NODE_ENV} environment.`);
  } catch (error) {
    console.log(`Database connection error ${error}`);
    process.exit(1);
  }
};

export default connectToDatabase;
