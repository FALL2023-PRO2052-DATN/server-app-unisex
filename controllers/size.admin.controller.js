const sizeAdminModel = require('../models/size.admin.model.js');
const productSizeAdminModel = require('../models/product-size.admin.model.js');

// Kiểm tra kích thước tồn tại
const isSizeExist = (sizes, name) => {
    return sizes.some((size) => size.ten_kich_thuoc === name);
}

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminSize = async (req, res) => {
    try {
        const sizes = await sizeAdminModel.getAll();
        res.status(200).render('size', { sizes });
    } catch (error) {
        handleError(res, error);
    }
}

const insertSize = async (req, res) => {
    try {
        const { name, description } = req.body;
        const sizes = await sizeAdminModel.getAll();

        if (isSizeExist(sizes, name)) {
            req.flash('warning', 'Thêm không thành công. Tên kích thước đã tồn tại.');
        } else {
            const data = { name, description };
            await sizeAdminModel.insert(data);
            req.flash('success', 'Thêm kích thước thành công');
        }

        res.status(200).redirect('/admin/size');
    } catch (error) {
        handleError(res, error);
    }
}

const updateSize = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        const sizes = await sizeAdminModel.getAll();
        const sizeToUpdate = sizes.find((size) => size.id === parseInt(id, 10));
        const sizesExceptCurrent = sizes.filter((size) => size !== sizeToUpdate);

        if (isSizeExist(sizesExceptCurrent, name)) {
            req.flash('warning', 'Cập nhật không thành công. Tên kích thước đã tồn tại.');
        } else {
            const data = { id, name, description };
            await sizeAdminModel.update(data);
            req.flash('success', 'Cập nhật kích thước thành công.');
        }

        res.status(200).redirect('/admin/size');
    } catch (error) {
        handleError(res, error);
    }
}

const removeSize = async (req, res) => {
    try {
        const { id } = req.body;
        const productsWithSize = await productSizeAdminModel.getAllBySizeId(id);

        if (productsWithSize.length > 0) {
            req.flash('warning', 'Xoá kích thước không thành công. Đã có sản phẩm thuộc kích thước này.');
        } else {
            await sizeAdminModel.remove(id);
            req.flash('success', 'Xoá kích thước thành công.');
        }

        res.status(200).redirect('/admin/size');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminSize,
    insertSize,
    updateSize,
    removeSize
}