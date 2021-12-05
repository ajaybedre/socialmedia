const {Op} =require('sequelize');
const Db =require('../models/index')

const {User,Comment,Like,Post} =Db;
//render post
//check auth
// module.exports.renderPost = async (req,res)=>{
    // const posts = Post.findAll({
    //     [Op.or]:[
    //         {PostId:req.user.username},
    //         {PostId:}
    //     ]
    // })
// }




//render likes
//check auth
module.exports.likesCount = async (req,res)=>{
   try{
        const likes = Like.findAll({
            where:{
                PostId:req.params.PostId
            }
        })
        let count=0;
        likes.forEach(like => {
            count++;
        });
        return res.json({likeCount:count});
   }catch(err){
        console.log(`Err in likes count ${err}`)
        return res.sendStatus(300);
   }
}
module.exports.commentsCount = async (req,res)=>{
    try{
        const comments = Comment.findAll({
            where:{
                PostId:req.params.PostId
            }
        });
        let count=0;
        comments.forEach(like => {
            count++;
        });
        return res.json({commentCount:count});
    }catch(err){
        console.log(`Err in likes count ${err}`)
        return res.sendStatus(300);
    }
 }
 

//render comments
//check auth
module.exports.renderComments = async (req,res)=>{
    
}

