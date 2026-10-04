import express from 'express';
import cookieParser from "cookie-parser"
import cors from "cors"


const app= express()

app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


// import routes
import authRouter from './routes/auth.routes.js'

// using all the routes
app.use("/api/v1/auth",authRouter)


export {app}    