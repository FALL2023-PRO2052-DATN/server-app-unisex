const router = require('express').Router();
const bannerAdminController = require('../controllers/banner.admin.controller.js');

router.get('/banner', bannerAdminController.pageAdminBanner);
router.post('/banner/create', bannerAdminController.insertBanner);
router.post('/banner/delete', bannerAdminController.removeBanner);

module.exports = router;