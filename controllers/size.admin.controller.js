const arrayHelpers = require('../helpers/array-helpers.js');
const sizeAdminModel = require('../models/size.admin.model.js');
const productSizeAdminModel = require('../models/product-size.admin.model.js');

const isSizeNameExist = (sizes, sizeName) => {
    return sizes.some((size) => size.ten_kich_thuoc === sizeName);
}

const renderPageSize = async (req, res) => {
    try {
        const sizes = await sizeAdminModel.getSizes();
        const sizesReversed = arrayHelpers.reverseArray(sizes);

        res.status(200).render('size', { sizes: sizesReversed });
    } catch (error) {
        console.log('Render page size error: ' + error.message);
    }
}

const insertSize = async (req, res) => {
    try {
        const { sizeName, sizeDescription } = req.body;
        const sizes = await sizeAdminModel.getSizes();

        if (isSizeNameExist(sizes, sizeName)) {
            req.flash('warning', 'Thêm không thành công. Tên kích thước đã tồn tại.');
        } else {
            const data = { sizeName, sizeDescription };
            await sizeAdminModel.insertSize(data);
            req.flash('success', 'Thêm kích thước thành công');
        }

        res.status(200).redirect('/admin/size');
    } catch (error) {
        console.log('Inserter size error: ' + error.message);
    }
}

const updateSize = async (req, res) => {
    try {
        const { sizeID, sizeName, sizeDescription } = req.body;
        const sizes = await sizeAdminModel.getSizes();
        const sizeCurrentToUpdate = sizes.find((size) => size.id === parseInt(sizeID, 10));
        const sizesExceptCurrent = sizes.filter((size) => size !== sizeCurrentToUpdate);

        if (isSizeNameExist(sizesExceptCurrent, sizeName)) {
            req.flash('warning', 'Cập nhật không thành công. Tên kích thước đã tồn tại.');
        } else {
            const data = { sizeID, sizeName, sizeDescription };
            await sizeAdminModel.updateSize(data);
            req.flash('success', 'Cập nhật kích thước thành công.');
        }

        res.status(200).redirect('/admin/size');
    } catch (error) {
        console.log('Remove size error: ' + error.message);
    }
}

const removeSize = async (req, res) => {
    try {
        const { sizeID } = req.body;
        const productsWithSize = await productSizeAdminModel.getProductSizesBySizeId(sizeID);

        if (productsWithSize.length > 0) {
            req.flash('warning', 'Xoá kích thước không thành công. Đã có sản phẩm thuộc kích thước này.');
        } else {
            await sizeAdminModel.removeSize(sizeID);
            req.flash('success', 'Xoá kích thước thành công.');
        }

        res.status(200).redirect('/admin/size');
    } catch (error) {
        console.log('Remove size error: ' + error.message);
    }
}

module.exports = {
    renderPageSize,
    insertSize,
    updateSize,
    removeSize
}