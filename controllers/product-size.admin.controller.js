const productSizeModel = require('../models/product-size.admin.model.js');

const pageProductSize = async (req, res) => {
    try {
        const productSizes = await productSizeModel.getAll();
        res.render('product-size', {productSizes});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

const updateQuantityProductSize = async (req, res) => {
    try {
        const {idProductSize, quantityProduct} = req.body;
        await productSizeModel.updateQuatity(idProductSize, quantityProduct);
        req.flash('success', 'Cập nhật nhập số lượng sản phẩm thành công');
        res.redirect('/admin/product-size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

const removeProductSize = async (req, res) => {
    try {
        const { idProductSize } = req.body;
        console.log(idProductSize);
        await productSizeModel.removeById(idProductSize);
        req.flash('success', 'Xoá kích thước sản phẩm thành công');
        res.redirect('/admin/product-size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

module.exports = {
    pageProductSize,
    updateQuantityProductSize,
    removeProductSize
}