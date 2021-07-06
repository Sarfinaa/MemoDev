import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cardRoutes from './routes/cards.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
const app=express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/cards',cardRoutes);
app.use('/user',userRoutes);
const PORT=process.env.PORT || 5000;
const CONNECTION_URL="mongodb+srv://Sarfina:Hello12@cluster0.bmlva.mongodb.net/Memocode?retryWrites=true&w=majority";
//connecting app to database
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on ${PORT}`)))
.catch(error=>console.log(error.message));
mongoose.set('useFindAndModify',false);