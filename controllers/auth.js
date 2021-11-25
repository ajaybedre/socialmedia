
const jwt = require('jsonwebtoken');
const User = require('../models/user');



module.exports.create = async (req,res)=>{
    try{
        // console.log(req.body.email)
        const user = await User.create({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            contactNo:req.body.contactNo,
            firstName:req.body.firstName,
            midName:req.body.midName,
            lastName:req.body.lastName
        });
        console.log(user);
        return res.sendStatus(200);

    }catch(err){
       console.error(`Error in creating user: ${err}`);
       return res.sendStatus(403);
    }
}

module.exports.login = async (req,res)=>{
    try{
        //password - confirm password check at client side
        const user = await User.findOne({where:{username:req.body.username}});
        if(user){
           if(user.verifyPassword(req.body.password)){
               const token = jwt.sign({username:user.username,id:user.id},process.env.jwtSecret);
               res.cookie('accessToken',token);
               return res.sendStatus(200);
           }
        }else{
            return res.sendStatus(401);
        }
    }catch(err){
        console.error(`Error in logging  user: ${err}`);
        return res.sendStatus(403);
    }
}