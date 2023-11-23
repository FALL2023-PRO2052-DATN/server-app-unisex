const express = require('express');
const router = express.Router();
const typeProductController = require('../../controllers/user/typeProduct.controlller');

router.get('/read-type-product', typeProductController.readTypeProduct);

module.exports = router;  