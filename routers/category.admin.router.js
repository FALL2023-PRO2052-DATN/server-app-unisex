const router = require('express').Router();
const categoryController = require('../controllers/category.admin.controller.js');

router.get('/category', categoryController.pageCategory);
router.post('/category/create', categoryController.insertCategory);
router.post('/category/update', categoryController.updateCategory);
router.post('/category/delele', categoryController.removeCategory);

module.exports = router;