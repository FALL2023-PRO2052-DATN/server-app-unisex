const categoryModel = require('../models/category.admin.model.js');
const productModel = require('../models/product.admin.model.js');

const isCategoryExist = (categories, name) => {
    return categories.some((category) => category.ten_danh_muc === name);
}

const pageCategory = async (req, res) => {
    try {
        const categories = await categoryModel.getAll();
        res.render('category', { categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const insertCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categories = await categoryModel.getAll();

        if (isCategoryExist(categories, name)) {
            req.flash('warning', 'Thêm danh mục không thành công. Tên danh mục đã tồn tại.');
        } else {
            await categoryModel.insert(name);
            req.flash('success', 'Thêm danh mục thành công.');
        }

        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, name } = req.body;
        const categories = await categoryModel.getAll();

        const categoryToUpdate = categories.find((category) => category.id_danh_muc === parseInt(id, 10));
        const categoriesExceptCurrent = categories.filter((category) => category !== categoryToUpdate);

        if (isCategoryExist(categoriesExceptCurrent, name)) {
            req.flash('warning', 'Cập nhật không thành công. Tên danh mục đã tồn tại.');
        } else {
            const data = { id, name };
            await categoryModel.update(data);
            req.flash('success', 'Cập nhật danh mục thành công.');
        }

        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const removeCategory = async (req, res) => {
    try {
        const EMPTY_COUNT = 0;
        const { id } = req.body;
        const products = await productModel.getAllByCategoryId(id);

        if (products.length > EMPTY_COUNT) {
            req.flash('warning', 'Không thể xóa danh mục. Đã có sản phẩm thuộc danh mục này.');
        } else {
            await categoryModel.remove(id);
            req.flash('success', 'Xóa danh mục thành công.');
        }

        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
};

module.exports = {
    pageCategory,
    insertCategory,
    updateCategory,
    removeCategory
}