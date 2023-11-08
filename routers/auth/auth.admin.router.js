const router = require('express').Router();
const authAdminController = require('../../controllers/auth/auth.admin.controller.js');

router.get('/login', authAdminController.pageLogin);
router.post('/login', authAdminController.signIn);
router.post('/admin/update-profile', authAdminController.updateProfile);
router.get('/admin/setting', authAdminController.pageSetting);
router.get('/signOut', authAdminController.signOut);

module.exports = router;