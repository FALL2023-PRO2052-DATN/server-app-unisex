const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const bannerController = require('../../controllers/admin/banner.controller.js');

router.get('/banner', authMiddleware.signed, bannerController.renderPageBanner);
router.post('/banner', authMiddleware.signed, bannerController.insertBanner);
router.put('/banner/:bannerID', authMiddleware.signed, bannerController.updateBannerStatus);
router.delete('/banner/:bannerID', authMiddleware.signed, bannerController.removeBanner);

module.exports = router;