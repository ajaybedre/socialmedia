const express = require('express')
require('dotenv').config()

const port =process.env.PORT
const app = express()

//use express routes
app.use('/',require('./routes'));


//database connection authentication
const db = require('./config/mysql_connecton');
db.authenticate()
.then(()=>{
    console.log('Connection has been established successfully.');
})
.catch((err)=>{
    console.error(`Error in connecting database : ${err} `)
})

//starting express server
app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    console.log(`Server started on port ${port}`);
})