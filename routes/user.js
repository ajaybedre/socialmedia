const express = require('express');
const { isAuthenticated } = require('../controllers/auth');
const { addPost, addComment, addLike }= require('../controllers/user');

const router = express.Router();


//check Authenticated
router.post('/post',isAuthenticated,addPost);

//check auth and friends
// router.post('/comment/:postId',isAuthenticated,addComment);

//check auth and friends
// router.post('/like/:postId',isAuthenticated,addLike);

module.exports =router;