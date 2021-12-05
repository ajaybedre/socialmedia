
const Db = require('../models/index'); //req all//temp
const {Op} = require('sequelize');

const {User,Post,Comment,Like,FriendList} = Db;

//check friendship
module.exports.isFriendByPostId = async (req,res,next)=>{
    const post= await Post.findOne({
        where:{
           id:req.params.PostId
        }
    });
    const friends = await FriendList.findOne({
        where:{
            [Op.and]:[
                {UserId: req.user.username},
                { FriendId: post.UserId }
            ]
        }
    });
    if(friends && friends.status==1){
        next();
    }else{
        return res.sendStatus(400);
    }
}
//create friend list
//create requested
//create pending
//
//add post to your account
module.exports.addPost = async (req,res)=>{
    try{
        const {caption,data} = req.body;
        await Post.create({
          caption,
          data,
          UserId:req.user.username
        });
        return res.sendStatus(200);
    }catch(err){
        console.error(`Error in adding post: ${err}`);
        return res.sendStatus(400);
    }
}

//add comment to post
//check auth and friend
module.exports.addComment = async (req,res)=>{
    try{
        const PostId =req.params.PostId;
        const username = req.user.username;

        // const post = await Post.findOne({
        //     where:{
        //         id:PostId
        //     }
        // })

        // if(post){
            //check post owner is friend
            await Comment.create({
                comment:req.body.comment,
                UserId:username,
                PostId:PostId
            });

            return res.sendStatus(200);
        // }else{
        //     return res.sendStatus(400);
        // }

    }catch(err){
        console.error(`Error in adding comment: ${err}`);
        return res.sendStatus(400);
    }
}


// //delete comment
module.exports.deleteComment = async (req,res)=>{
    try{

        const comment = await Comment.findOne({
            where:{
                id:req.params.commentId
            }
        });

        if(comment && comment.userId == req.user.username){
            await Comment.destroy({
                where: {
                    id: req.params.commentId
                }
            });   

            return res.sendStatus(200);
            
        }else{
            return res.sendStatus(400);
        }
    }catch(err){
        console.error(`Error in deleting comment: ${err}`);
        return res.sendStatus(400);
    }
}


// //add like to post
// //check auth and friend

module.exports.addLike = async (req,res)=>{
    try{
        const postId =req.params.postId;
        const username = req.user.username;

        // const post = await Post.findOne({
        //     where:{
        //         id:postId
        //     }
        // })

        // if(post){
            //check post owner is friend

            
            //delete if already liked
 
            const like = await Like.findOne({          
                where:{
                    [Op.and]:[
                        {userId: username },
                        { postId: postId }
                    ]
                }
            })
            if(like){
                await Like.destroy({
                    where: {
                        id: like.id
                    }
                })
                
                return res.sendStatus(200);
            }else{

                await Like.create({
                    userId:username,
                    postId:postId
                });
    
                return res.sendStatus(200);
            }
        // }else{
        //     return res.sendStatus(400);
        // }

    }catch(err){
        console.error(`Error in adding like: ${err}`);
        return res.sendStatus(400);
    }
}

