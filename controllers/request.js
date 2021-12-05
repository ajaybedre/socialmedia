//received req
//sent req
//req
//acc
// const { from } = require('form-data');
const {Op} =require('sequelize');
const Db = require('../models/index');
const {User,Post,Like,Comment,FriendList} =Db;

//send friend request
module.exports.sendRequest = async (req,res)=>{
    try{
        //check if already friend
        const friends = await FriendList.findOne({
            where:{
                [Op.and]:[
                    {UserId: req.user.username},
                    { FriendId: req.params.username }
                ]
            }
        });
        if(friends){

            return res.send(200).json({message:"already friends"});
        }else{
            const user = await User.findOne({
                where:{
                    username : req.user.username
                }
            })
            const friend = await User.findOne({
                where:{
                    username:req.params.username
                }
            })
            user.addUser(friend);
            return res.sendStatus(200);
        }
    }catch(err){
        console.log(`Error in sending request: ${err}`);
        res.sendStatus(404);
    }
    
}

//accept friendRequest
module.exports.addFriend = async (req,res)=>{
    try{
        const friends = await FriendList.findOne({
            where:{
                [Op.and]:[
                    {UserId: req.user.username},
                    { FriendId: req.params.username }
                ]
            }
        });
        if(friends){
            console.log(friends);
            return res.sendStatus(200);
        }else{
            const user = await User.findOne({
                where:{
                    username:req.user.username
                }
            })
            const friend = await User.findOne({
                where:{
                    username:req.params.username
                }
            })
            // { through: { selfGranted: false } }
            await user.addUser(friend,{ through: { status: true } });
            await friend.addUser(user,{ through: { status: true } });
            return res.sendStatus(200);
        }
        // return res.sendStatus(300);
    }catch(err){
        console.log(`Error in adding friend: ${err}`);
        res.sendStatus(404);
    }
    
}

//delete request
module.exports.rejectRequest = async (req,res)=>{
    try{
        await FriendList.destroy({
            where:{
                [Op.and]:[
                    {UserId: req.params.username},
                    { FriendId: req.user.username }
                ]
            }
        })
        return res.sendStatus(200);
        
        // return res.sendStatus(300);
    }catch(err){
        console.log(`Error in adding friend: ${err}`);
        res.sendStatus(404);
    }
    
}





//show pending friend req
module.exports.showPendingRequests =async (req,res)=>{
    try{
        const friends = await FriendList.findAll({
            where:{
                [Op.and]:[
                    {FriendId: req.params.username},
                    { status:0 }
                ]
            }
        });
        return res.send({
            pendingRequests:friends.UserId
        })
    }catch(err){
       console.log(`Error in showing pending Requests ${err}`);
       return res.sendStatus(400);
    }
}

//show sent req
module.exports.showSentRequests =async (req,res)=>{
    try{
        const friends = await FriendList.findAll({
            where:{
                [Op.and]:[
                    {UserId: req.params.username},
                    { status:0 }
                ]
            }
        });
        return res.send({
            sentRequests:friends.FriendsId
        })
    }catch(err){
       console.log(`Error in showing sent Requests ${err}`);
       return res.sendStatus(400);
    }
}

//show friends

module.exports.showFriends =async (req,res)=>{
    try{
        const friends = await FriendList.findAll({
            where:{
                [Op.and]:[
                    {UserId: req.params.username},
                    { status:1 }
                ]
            }
        });
        return res.send({
            sentRequests:friends.FriendsId
        })
    }catch(err){
       console.log(`Error in showing sent Requests ${err}`);
       return res.sendStatus(400);
    }
}