import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import memoryRouter from './routers/memoryRouter.js'
import userRouter from './routers/userRouter.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express();
app.use(express.json({limit: '20mb'}))
app.use(cors({credentials: true, origin: 'https://memory-box-react.netlify.app'}))
app.use('/memories',memoryRouter)
app.use('/users', userRouter)
app.use(cookieParser())

app.listen(process.env.PORT, ()=>{
    console.log(`${process.env.PORT} Portu Dinleniyor`);
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        
    }).then(()=>console.log('database connection success')).catch((err)=>console.log(err))
})