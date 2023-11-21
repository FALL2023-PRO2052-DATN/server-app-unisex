const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/account.user.controllers');

router.post('/insert-user', userController.insertUser);

module.exports = router;