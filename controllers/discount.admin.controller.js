const discountModel = require('../models/discout.admin.model.js');

const isDiscountExist = (discounts, code) => {
    return discounts.some((discount) => discount.code === code);
}

const pageDiscount = async (req, res) => {
    try {
        const discounts = await discountModel.getAll();
        res.render('discount', { discounts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const insertDiscount = async (req, res) => {
    try {
        const { code, value } = req.body;
        const discounts = await discountModel.getAll();

        if (isDiscountExist(discounts, code)) {
            req.flash('warning', 'Thêm mã giảm giá không thành công. Mã code giảm giá đã tồn tại');
        } else {
            const data = { code, value };
            await discountModel.insert(data);
            req.flash('success', 'Thêm mã giảm giá thành công');
        }

        res.redirect('/admin/discount');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const updateDiscount = async (req, res) => {
    try {
        const { id, code, value } = req.body;
        const discounts = await discountModel.getAll();

        const discountToUpdate = discounts.find((discount) => discount.id === parseInt(id, 10));
        const discountsExceptCurrent = discounts.filter((discount) => discount !== discountToUpdate);

        if (isDiscountExist(discountsExceptCurrent, code)) {
            req.flash('warning', 'Cập nhật mã giảm giá không thành công. Mã code giảm giá đã tồn tại');
        } else {
            const data = { code, value, id };
            await discountModel.update(data);
            req.flash('success', 'Cập nhật mã giảm giá thành công');
        }

        res.redirect('/admin/discount');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const removeDiscount = async (req, res) => {
    try {
        const { id } = req.body;
        await discountModel.remove(id);
        req.flash('success', 'Xoá mã giảm giá thành công.');
        res.redirect('/admin/discount');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

module.exports = {
    pageDiscount,
    insertDiscount,
    updateDiscount,
    removeDiscount
}