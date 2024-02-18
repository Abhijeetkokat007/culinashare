import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();
const app = Express();
const url = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;
app.use(Express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
const connectDB = async () => {
  try{
      const connection = await mongoose.createConnection(process.env.MONGODB_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  if (connection) {
      console.log(`mongoDB connected`)
  }
  } catch(e){
      console.log(e.message);
  }
};



// mongoose.connect(
//   process.env.MONGODB ,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
  
// );
// console.log("database:", process.env.MONGODB )
// console.log(url)
// app.listen(3001, () => console.log("Server started "));

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