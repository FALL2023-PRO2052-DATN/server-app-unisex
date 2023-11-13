const categoryAdminModel = require('../models/category.admin.model.js');
const productAdminModel = require('../models/product.admin.model.js');
const arrHelpers = require('../helpers/array-helpers.js');

const isCategoryNameExist = (categories, categoryName) => {
    return categories.some((category) => category.ten_danh_muc === categoryName);
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
        const { categoryName } = req.body;
        const categories = await categoryAdminModel.getCategories();

        if (isCategoryNameExist(categories, categoryName)) {
            req.flash('warning', 'Thêm không thành công. Tên danh mục đã tồn tại.');
        } else {
            await categoryAdminModel.insertCategory(categoryName);
            req.flash('success', 'Thêm danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        console.error('Insert category error', error);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { categoryID, categoryName } = req.body;
        const categories = await categoryAdminModel.getCategories();
        const categoryCurrentToUpdate = categories.find((category) => category.id_danh_muc === parseInt(categoryID, 10));
        const categoriesExceptCurrent = categories.filter((category) => category !== categoryCurrentToUpdate);

        if (isCategoryNameExist(categoriesExceptCurrent, categoryName)) {
            req.flash('warning', 'Cập nhật không thành công. Tên danh mục đã tồn tại.');
        } else {
            const data = { categoryID, categoryName };
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
        const { categoryID } = req.body;
        const products = await productAdminModel.getProductsByCategoryId(categoryID);

        if (products.length > 0) {
            req.flash('warning', 'Không thể xóa danh mục. Đã có sản phẩm thuộc danh mục này.');
        } else {
            await categoryAdminModel.removeCategory(categoryID);
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