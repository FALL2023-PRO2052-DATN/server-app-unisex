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

const removeProductSize = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        await productSizeModel.removeById(id);
        req.flash('success', 'Xoá kích thước sản phẩm thành công.');
        res.redirect('/admin/product-size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

module.exports = {
    pageProductSize,
    updateQuantityProductSize,
    removeProductSize
}