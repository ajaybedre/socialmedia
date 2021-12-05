const { Sequelize } = require('sequelize');

const sequalize = new Sequelize('socialmedia', 'root', 'Ajay@1234', {
  host: 'localhost',
  dialect: 'mysql'
});

sequalize.authenticate()
.then(()=>{
    console.log('Connection has been established successfully.');
})
.catch((err)=>{
    console.error(`Error in connecting database : ${err} `)
})

module.exports = sequalize;
