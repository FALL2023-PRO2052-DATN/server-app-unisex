const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.admin.controller.js');

router.get('/banner', bannerController.pageBaner);
router.post('/banner/add', bannerController.create);
router.post('/banner/delete', bannerController.remove);

module.exports = router;