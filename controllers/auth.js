

const jwt = require('jsonwebtoken');
const Db= require('../models/index');
var nodemailer = require('nodemailer');

const User = Db.User;

//creating new user

module.exports.create = async (req,res)=>{
    try{
        const {username,password,email,contactNo,firstName,midName,lastName}=req.body;
        const user = await User.create({
            username:username,
            password:password,
            email:email,
            contactNo:contactNo,
            firstName:firstName,
            midName:midName,
            lastName:lastName
        });
        console.log(user);
        return res.sendStatus(200);

    }catch(err){
       console.error(`Error in creating user: ${err}`);
       return res.sendStatus(403);
    }
}


//user login

module.exports.login = async (req,res)=>{
    try{
        //password - confirm password check at client side
        const user = await User.findOne({where:{username:req.body.username}});
        if(user){
           if(user.verifyPassword(req.body.password)){
               const token = jwt.sign({username:user.username,_id:user.id},process.env.jwtSecret);
               res.cookie('accessToken',token);
               return res.sendStatus(200);
           }else{
               console.log("hh")
               return res.sendStatus(400);
           }
        }else{
            console.log("hhh")
            return res.sendStatus(401);
        }
    }catch(err){
        console.error(`Error in logging  user: ${err}`);
        return res.sendStatus(403);
    }
}

//authentication middleware

module.exports.isAuthenticated = async(req,res,next)=>{
    try{
        const token =req.cookies.accessToken;
        await jwt.verify(token,process.env.jwtSecret,(err,user)=>{
            if(err){
                return res.sendStatus(404);
            }
            req.user =user;
            next();
        })
       
    }catch(err){

        console.error(`Error in isAuthenticated middleware: ${err}`);
        return res.sendStatus(403);

    }
}

// changing/updating password

module.exports.updatePassword =async (req,res)=>{
    try{
        console.log(req.user.username);
        console.log(req.body);
        const user = await User.findOne({where:{username:req.user.username}});
        if(user){
            if(user.verifyPassword(req.body.password)){
                await User.update({ password: req.body.newPassword }, {
                    where: {
                      username: req.user.username
                    }
                  });
                  res.sendStatus(200);
            }else{
                return res.sendStatus(403);
            }
        }else{
            return res.sendStatus(404);
        }
        
    }catch(err){
        console.error(`Error in updating  password: ${err}`);
        return res.sendStatus(403);
    }
}
//function to send mail
const sendEmail =async(userEmail,link)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ajaybedre64@gmail.com',
          pass: 'xwjfmrdpgvtufrsx'
        }
      });
      
      var mailOptions = {
        from: process.env.mailId,
        to: userEmail,
        subject: 'Password reset mail from Social',
        text:  `Please click the link below to reset your password.
        The link will be valid for 15 minutes.

        ${link}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        //   console.error(`Error in sending Email: ${error}`);
          return false;
        } else {
        //   console.log('Email sent: ' + info);
          return true;
        }
      });
}
//generate link and send on mail

module.exports.forgotPassword =async (req,res)=>{
    try{
        
       const email =req.body.email;
       console.log(email);
       const user = await User.findOne({where:{email:email}});

       const token = jwt.sign({username:user.username,_id:user.id},process.env.jwtSecret+user.password,{expiresIn:'15m'});
       const link = `http://localhost:6000/auth/${user.username}/${token}`;
       console.log(link);
       const result=sendEmail(user.email,link);
       if(result){
           return res.sendStatus(200);
       }else{
           return res.sendStatus(400);
       }
       
    }catch(err){
        console.error(`Error in forgotPassword middleware: ${err}`);
        return res.sendStatus(403);
    }
}

//render to proper page //get
module.exports.resetPassword =async (req,res)=>{
    try{
        const {id,token}=req.params;

        const user = await User.findOne({where:{id:id}});
        await jwt.verify(token,process.env.jwtSecret+user.password);
        //render some view with user etails
        res.sendStatus(200);//temp
    }catch(err){
        console.error(`Error in resetPassword middleware: ${err}`);
        return res.sendStatus(403);
    }
}

//handle password updates //post

module.exports.updateNewPassword =async (req,res)=>{
    try{
        //check password and confirm password
        //accept newpassword
        const {id,token}=req.params;
        const user = await User.findOne({where:{username:id}});
        await jwt.verify(token,process.env.jwtSecret+user.password);
        await User.update({ password: req.body.newPassword }, {
            where: {
              username: user.username
            }
        });
        //temp
        return res.sendStatus(200);
    }catch(err){
        console.error(`Error in resetPassword middleware: ${err}`);
        return res.sendStatus(403);
    }
}