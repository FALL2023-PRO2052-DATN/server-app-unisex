const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/size.admin.controller.js');

router.get('/size', sizeController.pageSize);
router.post('/size/create', sizeController.insertSize);
router.post('/size/update', sizeController.updateSize);
router.post('/size/delete', sizeController.removeSize);

module.exports = router;