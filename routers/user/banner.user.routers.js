const express = require('express');
const router = express.Router();
const bannerController = require('../../controllers/user/banner.user.controllers');

router.get('/read-banner', bannerController.readBanner);

module.exports = router;    