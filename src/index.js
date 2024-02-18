import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();
const app = express();
const url = process.env.MONGODB

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  process.env.MONGODB ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  
);
console.log("database:", process.env.MONGODB )
console.log(url)
app.listen(3001, () => console.log("Server started "));
