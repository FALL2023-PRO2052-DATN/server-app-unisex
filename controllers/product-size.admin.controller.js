const productSizeModel = require('../models/product-size.admin.model.js');

const pageProductSize = async (req, res) => {
    try {
        const productsSize = await productSizeModel.getAll();
        res.render('product-size', { productsSize });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const insertProductSize = async (req, res) => {
    const { idProduct, size, quantity } = req.body;
    try {
        const data = { size, idProduct, quantity };
        await productSizeModel.insert(data);
        req.flash('success', 'Thêm phiên bản thành công.');
        res.redirect('/admin/product/update/' + idProduct);
    } catch (error) {
        console.error(error);
        req.flash('warning', 'Thêm phiên bản sản phẩm không thành công. Phiên bản đã tồn tại.');
        res.redirect('/admin/product/update/' + idProduct);
    }
}

const updateQuantityProductSize = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        await productSizeModel.updateQuatity(id, quantity);
        req.flash('success', 'Cập nhật nhập số lượng sản phẩm thành công');
        res.redirect('/admin/product-size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const updateProductSize = async (req, res) => {
    const { idProductSize, idProduct, size, quantity } = req.body;
    try {
        const data = {
            size,
            idProduct,
            quantity,
            idProductSize
        };
        await productSizeModel.update(data);
        req.flash('success', 'Cập nhật phiên bản sản phẩm thành công.');
        res.redirect('/admin/product/update/' + idProduct);
    } catch (error) {
        console.error(error);
        req.flash('warning', 'Phiên bản đã tồn tại trước đó. Cập nhật không thành công');
        res.redirect('/admin/product/update/' + idProduct);
    }
}

const removeProductSize = async (req, res) => {
    try {
        const { id } = req.body;
        await productSizeModel.removeById(id);
        req.flash('success', 'Xoá kích thước sản phẩm thành công.');
        res.redirect('/admin/product-size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const removeProductSizeFromUpdateProduct = async (req, res) => {
    try {
        const { idProduct, idProductSize } = req.body;
        await productSizeModel.removeById(idProductSize);
        req.flash('success', 'Xoá phiên bản sản phẩm thành công.');
        res.redirect('/admin/product/update/' + idProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

module.exports = {
    pageProductSize,
    insertProductSize,
    updateProductSize,
    updateQuantityProductSize,
    removeProductSizeFromUpdateProduct,
    removeProductSize
}