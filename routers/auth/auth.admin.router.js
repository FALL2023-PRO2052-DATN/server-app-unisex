const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const authController = require('../../controllers/auth/auth.admin.controller.js');

router.get('/login', authController.renderPageLogin);
router.post('/login', authController.handleLogin);
router.get('/logout', authMiddleware.signed, authController.handleLogout);
router.get('/admin/setting', authMiddleware.signed, authController.renderPageSetting);
router.put('/admin/update-profile', authMiddleware.signed, authController.handleUpateProfileUser);

module.exports = router;