const categoryAdminModel = require('../models/category.admin.model.js');

// Kiểm tra danh mục tồn tại
const isCategoryExist = (categories, name) => {
    return categories.some((category) => category.ten_danh_muc === name);
}

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminCategory = async (req, res) => {
    try {
        const categories = await categoryAdminModel.getAll();
        res.status(200).render('category', { categories });
    } catch (error) {
        handleError(res, error);
    }
}

const insertCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categories = await categoryAdminModel.getAll();

        if (isCategoryExist(categories, name)) {
            req.flash('warning', 'Thêm không thành công. Tên danh mục đã tồn tại.');
        } else {
            await categoryAdminModel.insert(name);
            req.flash('success', 'Thêm danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        handleError(res, error);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, name } = req.body;
        const categories = await categoryAdminModel.getAll();
        const categoryToUpdate = categories.find((category) => category.id_danh_muc === parseInt(id, 10));
        const categoriesExceptCurrent = categories.filter((category) => category !== categoryToUpdate);

        if (isCategoryExist(categoriesExceptCurrent, name)) {
            req.flash('warning', 'Cập nhật không thành công. Tên danh mục đã tồn tại.');
        } else {
            const data = { id, name };
            await categoryAdminModel.update(data);
            req.flash('success', 'Cập nhật danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        handleError(res, error);
    }
}

const removeCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const productsWithCategory = await productModel.getAllByCategoryId(id);

        if (productsWithCategory.length > 0) {
            req.flash('warning', 'Không thể xóa danh mục. Đã có sản phẩm thuộc danh mục này.');
        } else {
            await categoryAdminModel.remove(id);
            req.flash('success', 'Xóa danh mục thành công.');
        }

        res.status(200).redirect('/admin/category');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminCategory,
    insertCategory,
    updateCategory,
    removeCategory
}