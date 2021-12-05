

const {Sequelize, DataTypes}=require('sequelize');
const sequelize = require('../config/mysql_connecton');

//dp model

const Db={};
Db.sequalize=sequelize;
Db.Sequelize=Sequelize;
Db.User = require('./users')(sequelize,DataTypes);
Db.Like = require('./likes')(sequelize,DataTypes);
Db.FriendList = require('./friendList')(sequelize,DataTypes);
Db.Comment= require('./comments')(sequelize,DataTypes);
Db.Post= require('./posts')(sequelize,DataTypes);

// console.log(Db.User)
//sync
sequelize.sync()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });



//Database Relations

//User -> Post || one - many
Db.User.hasMany(Db.Post,{foreignKey: 'UserId'});
Db.Post.belongsTo(Db.User,{foreignKey: 'UserId'});

// //User -> Comment || one - many
Db.User.hasMany(Db.Comment,{foreignKey:'UserId'});
Db.Comment.belongsTo(Db.User,{foreignKey:'UserId'});

// //Post -> Comment || one - many

Db.Post.hasMany(Db.Comment,{foreignKey:'PostId'});
Db.Comment.belongsTo(Db.Post,{foreignKey:'PostId'});


// //Post -> Like || one - many

Db.Post.hasMany(Db.Like,{foreignKey:'PostId'});
Db.Like.belongsTo(Db.Post,{foreignKey:'PostId'});

//User -> Like || one - many
Db.User.hasMany(Db.Like,{foreignKey:'UserId'});
Db.Like.belongsTo(Db.User,{foreignKey:'UserId'});

//User -> Friend || many - many
Db.User.belongsToMany(Db.User,{
    as:"User",
    foreignKey:"UserId",
    through:Db.FriendList
});

Db.User.belongsToMany(Db.User,{
    as:"Friend",
    foreignKey:"FriendId",
    through:Db.FriendList
})


module.exports =Db;

