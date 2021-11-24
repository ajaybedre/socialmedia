const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('socialmedia', 'root', 'Ajay@1234', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}