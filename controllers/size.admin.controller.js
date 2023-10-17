const sizeModel = require('../models/size.admin.model.js');
const productSizeModel = require('../models/product-size.admin.model.js');

const isSizeExist = (sizes, name) => {
    return sizes.some((size) => size.ten_kich_thuoc === name);
}

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageSize = async (req, res) => {
    try {
        const sizes = await sizeModel.getAll();
        res.render('size', { sizes });
    } catch (error) {
        handleError(res, error);
    }
}

const insertSize = async (req, res) => {
    try {
        const { name, description } = req.body;
        const sizes = await sizeModel.getAll();

        if (isSizeExist(sizes, name)) {
            req.flash('warning', 'Thêm không thành công. Tên kích thước đã tồn tại.');
        } else {
            const data = { name, description };
            await sizeModel.insert(data);
            req.flash('success', 'Thêm kích thước thành công');
        }

        res.redirect('/admin/size');
    } catch (error) {
        handleError(res, error);
    }
}

const updateSize = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        const sizes = await sizeModel.getAll();
        const sizeToUpdate = sizes.find((size) => size.id === parseInt(id, 10));
        const sizesExceptCurrent = sizes.filter((size) => size !== sizeToUpdate);

        if (isSizeExist(sizesExceptCurrent, name)) {
            req.flash('warning', 'Cập nhật không thành công. Tên kích thước đã tồn tại.');
        } else {
            const data = { id, name, description };
            await sizeModel.update(data);
            req.flash('success', 'Cập nhật kích thước thành công.');
        }

        res.redirect('/admin/size');
    } catch (error) {
        handleError(res, error);
    }
}

const removeSize = async (req, res) => {
    try {
        const { id } = req.body;
        const productsWithSize = await productSizeModel.getAllBySizeId(id);

        if (productsWithSize.length > 0) {
            req.flash('warning', 'Xoá kích thước không thành công. Đã có sản phẩm thuộc kích thước này.');
        } else {
            await sizeModel.remove(id);
            req.flash('success', 'Xoá kích thước thành công.');
        }

        res.redirect('/admin/size');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageSize,
    insertSize,
    updateSize,
    removeSize
}