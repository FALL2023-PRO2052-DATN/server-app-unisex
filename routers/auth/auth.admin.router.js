const router = require('express').Router();
const authAdminController = require('../../controllers/auth/auth.admin.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/login', authAdminController.renderPageLogin);
router.post('/login', authAdminController.handleLogin);
router.get('/admin/setting', authMiddleware.signed, authAdminController.renderPageSetting);
router.post('/admin/update-profile', authMiddleware.signed, authAdminController.handleUpateProfileUser);
router.get('/logout', authAdminController.handleLogout);

module.exports = router;