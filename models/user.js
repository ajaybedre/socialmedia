const {Sequelize,DataTypes} =require('sequelize')
const Db =require('../config/mysql_connecton');
const bcrypt = require('bcrypt');

const User= Db.define('User', {

    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    midName:{
        type:DataTypes.STRING,
        
    },
    lastName:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
    contactNo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value){
           this.setDataValue('password',bcrypt.hashSync(value, process.env.saltRounds))
        }
    }
    
}, {
    timestamps: true
});
User.prototype.verifyPassword = function(password) {
   return bcrypt.compareSync(password, this.password);
}
Db.sync()  
module.exports = User;