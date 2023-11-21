const router = require('express').Router();
const sizeController = require('../../controllers/admin/size.controller.js');
const authMiddleware = require('../../middleware/auth-middleware.js');

router.get('/size', authMiddleware.signed, sizeController.renderPageSize);
router.post('/size', authMiddleware.signed, sizeController.insertSize);
router.put('/size/:sizeID/update', authMiddleware.signed, sizeController.updateSize);
router.put('/size/:sizeID/delete', authMiddleware.signed, sizeController.removeSize);

module.exports = router;