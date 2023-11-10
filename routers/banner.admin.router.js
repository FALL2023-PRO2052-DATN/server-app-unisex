const router = require('express').Router();
const authMiddleware = require('../middleware/auth-middleware.js');
const bannerAdminController = require('../controllers/banner.admin.controller.js');

router.get('/banner', authMiddleware.signed, bannerAdminController.renderPageBanner);
router.post('/banner/create', authMiddleware.signed, bannerAdminController.insertBanner);
router.post('/banner/delete', authMiddleware.signed, bannerAdminController.removeBanner);

module.exports = router;