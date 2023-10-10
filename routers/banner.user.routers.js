const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.user.controllers');

router.get('/read-banner', bannerController.readBanner);

module.exports = router;    