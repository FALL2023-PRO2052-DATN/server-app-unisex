const router = require('express').Router();
const categoryAdminController = require('../controllers/category.admin.controller.js');

router.get('/category', categoryAdminController.pageAdminCategory);
router.post('/category/create', categoryAdminController.insertCategory);
router.post('/category/update', categoryAdminController.updateCategory);
router.post('/category/delele', categoryAdminController.removeCategory);

module.exports = router;