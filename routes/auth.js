const express =require('express');
const { create, login } = require('../controllers/auth');

const router =express.Router();



// router.post('/signup',);
router.post('/create',create);
router.get('/login',login);

module.exports =router;