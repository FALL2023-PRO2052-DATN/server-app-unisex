const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.admin.controller.js');

router.get('/category', categoryController.pageCategory);
router.post('/category/add', categoryController.insertCategory);
router.post('/category/update', categoryController.updateCategory);
router.post('/category/delele', categoryController.removeCategory);

module.exports = router;