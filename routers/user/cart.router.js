const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/user/cart.controlller');

router.post('/read-byId-user-cart', cartController.readCartById);
router.post('/insert-cart', cartController.insertCart);
router.post('/delete-cart', cartController.deleteCart);
router.post('/update-cart', cartController.updateCart);
module.exports = router;  