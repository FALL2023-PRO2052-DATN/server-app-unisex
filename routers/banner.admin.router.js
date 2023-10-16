const router = require('express').Router();
const bannerController = require('../controllers/banner.admin.controller.js');

router.get('/banner', bannerController.pageBanner);
router.post('/banner/create', bannerController.insertBanner);
router.post('/banner/delete', bannerController.removeBanner);

module.exports = router;