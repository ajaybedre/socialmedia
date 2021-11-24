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
    userName:{
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
    timestamps: true,
    instanceMethods: {
        verifyPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
    }
});

module.exports = User;