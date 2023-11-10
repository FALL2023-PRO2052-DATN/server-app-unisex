const categoryAdminModel = require('../models/category.admin.model.js');
const productAdminModel = require('../models/product.admin.model.js');
const arrHelpers = require('../helpers/array-helpers.js');

const isCategoryExist = (categories, name) => {
    return categories.some((category) => category.ten_danh_muc === name);
}

const renderPageCategory = async (req, res) => {
    try {
        const categories = await categoryAdminModel.getCategories();
        const categoriesReversed = arrHelpers.reverseArray(categories);

        res.status(200).render('category', { categories: categoriesReversed });
    } catch (error) {
        console.error('Render page category error', error);
    }
}

const insertCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categories = await categoryAdminModel.getCategories();

        if (isCategoryExist(categories, name)) {
            req.flash('warning', 'Thêm không thành công. Tên danh mục đã tồn tại.');
        } else {
            await categoryAdminModel.insertCategory(name);
            req.flash('success', 'Thêm danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        console.error('Insert category error', error);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, name } = req.body;
        const categories = await categoryAdminModel.getCategories();
        // Lấy danh mục cập nhật hiện tại
        const categoryToUpdate = categories.find((category) => category.id_danh_muc === parseInt(id, 10));
        // Lấy danh sách danh mục trừ danh mục hiện tại
        const categoriesExceptCurrent = categories.filter((category) => category !== categoryToUpdate);

        if (isCategoryExist(categoriesExceptCurrent, name)) {
            req.flash('warning', 'Cập nhật không thành công. Tên danh mục đã tồn tại.');
        } else {
            const data = { id, name };
            await categoryAdminModel.updateCategory(data);
            req.flash('success', 'Cập nhật danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        console.error('Update category error', error);
    }
}

const removeCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const productsWithCategory = await productAdminModel.getProductsByCategoryId(id);

        if (productsWithCategory.length > 0) {
            req.flash('warning', 'Không thể xóa danh mục. Đã có sản phẩm thuộc danh mục này.');
        } else {
            await categoryAdminModel.removeCategory(id);
            req.flash('success', 'Xóa danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        console.error('Remove category error', error);
    }
}

module.exports = {
    renderPageCategory,
    insertCategory,
    updateCategory,
    removeCategory
}