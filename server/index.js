import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import path from "path";

dotenv.config();
const app = Express();
const url = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(Express.json());

 


app.use((req, res, next) => {
  
  res.setHeader('Access-Control-Allow-Origin','https://recipe-share-ak.vercel.app' );
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
const connectDB = async () => {
  try{
      const connection = await mongoose.connect(process.env.MONGODB_URI)
  if (connection) {
      console.log(`mongoDB connected`)
  }
  } catch(e){
      console.log(e.message);
  }
};





if(process.env.NODE_ENV === "production"){
  app.use(Express.static(path.join(__dirname, '..', 'client', 'build'))); 
 
  app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
 }

app.listen(PORT, () => {
  console.log(`server is runing ${PORT}`)
  connectDB();
})
