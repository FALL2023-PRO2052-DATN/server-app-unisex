const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/size.admin.controller.js');

router.get('/size', sizeController.pageSize);
router.post('/size/add', sizeController.create);
router.post('/size/update', sizeController.update);
router.post('/size/delete', sizeController.remove);

module.exports = router;