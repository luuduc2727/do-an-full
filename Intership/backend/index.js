import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import resumeRoute from "./routes/resumeRoute.js"
import path from "path";
import { fileURLToPath } from 'url';
dotenv.config({})

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/home", (req, res)=>{
    return res.status(200).json({
        message: "backend is running",
        success: true
    })
})
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)
app.use("/api/v1/resume", resumeRoute)

// Thêm dòng này để phục vụ file tĩnh trong uploads/
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, ()=> {
    connectDB()
    console.log(`server is running on PORT ${PORT}`);
})