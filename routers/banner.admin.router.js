const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.admin.controller.js');

router.get('/banner', bannerController.pageBanner);
router.post('/banner/add', bannerController.insertBanner);
router.post('/banner/delete', bannerController.removeBanner);

module.exports = router;