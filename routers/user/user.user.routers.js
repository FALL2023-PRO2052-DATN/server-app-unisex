const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user.user.controllers');

router.post('/read-user', userController.readUser);
router.post('/update-user', userController.updateUser);

module.exports = router;  