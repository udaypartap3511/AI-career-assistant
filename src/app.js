import express from 'express';


const app= express()

app.use(express.json({limit:"16kb"}))


// import routes
import authRouter from './routes/auth.routes.js'

// using all the routes
app.use("/api/v1/auth",authRouter)


export {app}    