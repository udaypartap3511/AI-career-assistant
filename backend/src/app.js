import express from 'express';
import cookieParser from "cookie-parser"
import cors from "cors"


const app= express()

app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials:true
}))


// import routes
import authRouter from './routes/auth.routes.js'
import interviewRouter from "./routes/interview.routes.js"

// using all the routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/interview",interviewRouter)

export {app}    