const express = require('express');
const router = express.Router();
const typeProductController = require('../controllers/typeProduct.user.controlllers');

router.get('/read-type-product', typeProductController.readTypeProduct);

module.exports = router;  