import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose' ;
import cors from 'cors' ;

//import userRoutes
import userRoutes from './routes/user.js' ;

const app = express() ;

app.use(express.json({limit:"20mb", extended : true}));
app.use(express.urlencoded({limit:"20mb", extended : true}));

app.use(cors()) ;

//create user routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`Express Server is running at port: ${PORT}`)
})
