import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import userRoutes from './routes/userRoute.js'

// Files
import { connectDb } from "./config/db.js";

// Configuration
dotenv.config();
connectDb();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRoutes);


// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use((req,res,err,next)=>{
    const statusCode=req.statusCode || 500
    const errMessage=err.message || "internal server error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        errMessage
    })
})