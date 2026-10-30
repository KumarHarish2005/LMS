import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});

//call datab connection
connectDB();
const app = express()

const PORT = 8080
//apis
app.use('/api/v1/user',userRoute);

app.listen(8080,()=>{
    console.log(`Server listening at port: ${PORT}`)
})