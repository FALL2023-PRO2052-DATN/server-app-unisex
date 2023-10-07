const express = require('express');
const router = express.Router();
const userController = require('../controllers/account.user.controllers');

router.post('/inser-user', userController.insertUser);

module.exports = router;