const categoryModel = require('../models/category.admin.model.js');
const productModel = require('../models/product.admin.model.js');

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
        const categorys = await categoryModel.getAll();

        if (isCategoryExist(categorys, nameCategory)) {
            req.flash('warning', 'Thêm danh mục không thành công. Tên danh mục đã tồn tại.');
        } else {
            await categoryModel.insert(nameCategory);
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
        const { idCategory, nameCategory } = req.body;
        const categorys = await categoryModel.getAll();

        // Lấy danh sách danh mục ngoại trừ danh mục hiện tại
        const categorysExceptCurrent = categorys.filter((category) => category.id_danh_muc !== parseInt(idCategory, 10));

        if (isCategoryExist(categorysExceptCurrent, nameCategory)) {
            req.flash('warning', 'Cập nhật không thành cồng. Tên danh mục đã tồn tại.');
        } else {
            const data = { idCategory, nameCategory };
            await categoryModel.update(data);
            req.flash('success', 'Cập nhật danh mục thành công');
        }

        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const removeCategory = async (req, res) => {
    try {
        const { idCategory } = req.body;
        const products = await productModel.getAllByCategoryId(idCategory);

        // Kiểm tra có sản phẩm nào thuộc danh mục hay không
        if (products.length > 0) {
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

// Kiểm tra danh mục tồn tại
const isCategoryExist = (categorys, nameCategory) => {
    return categorys.some((category) => category.ten_danh_muc === nameCategory);
}

module.exports = {
    pageCategory,
    insertCategory,
    updateCategory,
    removeCategory
}