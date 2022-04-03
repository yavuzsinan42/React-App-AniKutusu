import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import memoryRouter from './routers/memoryRouter.js'

dotenv.config()

const app = express();
app.use(express.json({limit: '20mb'}))
app.use('/memories',memoryRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`${process.env.PORT} Portu Dinleniyor`);
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(()=>console.log('database connection success')).catch((err)=>console.log(err))
})