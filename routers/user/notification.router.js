const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/user/notification.controller.js')

router.post("/read/notifications", controllers.readNotification)

router.post("/insert/notification", controllers.insertNotification)

router.get('/delete/notification', controllers.deleteNotification);


module.exports = router