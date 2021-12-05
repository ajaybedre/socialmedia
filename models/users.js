
const bcrypt = require('bcrypt');


module.exports = (sequalize,DataTypes)=>{
    const User = sequalize.define('User', {

        username:{
            type:DataTypes.STRING,
            primaryKey: true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            set(value){
               this.setDataValue('password',bcrypt.hashSync(value, 10))
            }
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
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        midName:{
            type:DataTypes.STRING,
            
        },
        lastName:{
            type:DataTypes.STRING,
        }
    }, {
        timestamps: true
    });
    User.prototype.verifyPassword = function(password) {
       return bcrypt.compareSync(password, this.password);
    }
    return User;
}

