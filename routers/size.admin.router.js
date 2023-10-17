const router = require('express').Router();
const sizeAdminController = require('../controllers/size.admin.controller.js');

router.get('/size', sizeAdminController.pageAdminSize);
router.post('/size/create', sizeAdminController.insertSize);
router.post('/size/update', sizeAdminController.updateSize);
router.post('/size/delete', sizeAdminController.removeSize);

module.exports = router;