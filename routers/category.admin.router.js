const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.admin.controller.js');

router.get('/category', categoryController.pageCategory);
router.post('/category/add', categoryController.create);
router.post('/category/update', categoryController.update);
router.post('/category/delele', categoryController.remove);

module.exports = router;