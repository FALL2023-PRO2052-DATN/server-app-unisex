const router = require('express').Router();
const bannerAdminController = require('../controllers/banner.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/banner', authMiddleware.signed, bannerAdminController.pageAdminBanner);
router.post('/banner/create', authMiddleware.signed, bannerAdminController.insertBanner);
router.post('/banner/delete', authMiddleware.signed, bannerAdminController.removeBanner);

module.exports = router;