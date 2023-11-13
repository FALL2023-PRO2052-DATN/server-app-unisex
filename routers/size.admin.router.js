const router = require('express').Router();
const sizeAdminController = require('../controllers/size.admin.controller.js');
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/size', authMiddleware.signed, sizeAdminController.renderPageSize);
router.post('/size/create', authMiddleware.signed, sizeAdminController.insertSize);
router.post('/size/update', authMiddleware.signed, sizeAdminController.updateSize);
router.post('/size/delete', authMiddleware.signed, sizeAdminController.removeSize);

module.exports = router;