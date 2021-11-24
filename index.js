const express = require('express')
require('dotenv').config()

const port =process.env.PORT
const app = express()

//use express routes
app.use('/',require('./routes'));

const { Sequelize } = require('sequelize');


//starting express server
app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    console.log(`Server started on port ${port}`);
})