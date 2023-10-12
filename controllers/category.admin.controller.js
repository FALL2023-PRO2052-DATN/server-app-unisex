const categoryModel = require('../models/category.admin.model.js');

const pageCategory = async (req, res) => {
    try {
        const categorys = await categoryModel.getAll();
        res.render('category', { categorys });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const insertCategory = async (req, res) => {
    try {
        const { nameCategory } = req.body;
        await categoryModel.insert(nameCategory);
        req.flash('success', 'Thêm danh mục thành công.');
        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { idCategory, nameCategory } = req.body;
        const data = { idCategory, nameCategory };
        await categoryModel.update(data);
        req.flash('success', 'Cập nhật danh mục thành công');
        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const removeCategory = async (req, res) => {
    try {
        const { idCategory } = req.body;
        const productsWithCategory = await categoryModel.getProductsByIdCategory(idCategory);

        // Kiểm tra có sản phẩm nào thuộc danh mục hay không
        if (productsWithCategory.length > 0) {
            req.flash('warning', 'Không thể xoá danh mục. Đã có sản phẩm thuộc danh mục này!');
        } else {
            await categoryModel.remove(idCategory);
            req.flash('success', 'Xoá danh mục thành công.');
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