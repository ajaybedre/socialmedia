const { Sequelize } = require('sequelize');

module.exports = new Sequelize('socialmedia', 'root', 'Ajay@1234', {
  host: 'localhost',
  dialect: 'mysql'
});

