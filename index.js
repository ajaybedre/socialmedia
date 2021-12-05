const express = require('express')
require('dotenv').config();
const cookieParser =require('cookie-parser')
const port =process.env.PORT;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false})); //not needed
app.use(cookieParser());






//require data base models
require('./models/index');

//use express routes
app.use('/',require('./routes'));

//starting express server
app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    console.log(`Server started on port ${port}`);
})