const express = require('express');
const { isAuthenticated } = require('../controllers/auth');
const { sendRequest, addFriend, rejectRequest } = require('../controllers/request');

const router = express.Router();

router.post('/friend/:username',isAuthenticated,sendRequest);
router.post('/friend/add/:username',isAuthenticated,addFriend);
router.post('/friend/delete/:username',isAuthenticated,rejectRequest);//text

module.exports = router;