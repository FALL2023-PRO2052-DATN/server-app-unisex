const discountAdminModel = require('../models/discout.admin.model.js');

// Kiểm tra mã giảm giá tồn tại
const isDiscountExist = (discounts, code) => {
    return discounts.some((discount) => discount.code === code);
}

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminDiscount = async (req, res) => {
    try {
        const discounts = await discountAdminModel.getAll();
        res.status(200).render('discount', { discounts });
    } catch (error) {
        handleError(res, error);
    }
}

const insertDiscount = async (req, res) => {
    try {
        const { code, value } = req.body;
        const discounts = await discountAdminModel.getAll();

        if (isDiscountExist(discounts, code)) {
            req.flash('warning', 'Thêm không thành công. Mã code giảm giá đã tồn tại.');
        } else {
            const data = { code, value };
            await discountAdminModel.insert(data);
            req.flash('success', 'Thêm mã giảm giá thành công.');
        }

        res.status(200).redirect('/admin/discount');
    } catch (error) {
        handleError(res, error);
    }
}

const updateDiscount = async (req, res) => {
    try {
        const { id, code, value } = req.body;
        const discounts = await discountAdminModel.getAll();
        const discountToUpdate = discounts.find((discount) => discount.id === parseInt(id, 10));
        const discountsExceptCurrent = discounts.filter((discount) => discount !== discountToUpdate);

        if (isDiscountExist(discountsExceptCurrent, code)) {
            req.flash('warning', 'Cập nhật không thành công. Mã code giảm giá đã tồn tại.');
        } else {
            const data = { code, value, id };
            await discountAdminModel.update(data);
            req.flash('success', 'Cập nhật mã giảm giá thành công.');
        }

        res.status(200).redirect('/admin/discount');
    } catch (error) {
        handleError(res, error);
    }
}

const removeDiscount = async (req, res) => {
    try {
        const { id } = req.body;
        await discountAdminModel.remove(id);
        req.flash('success', 'Xoá mã giảm giá thành công.');
        res.redirect('/admin/discount');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminDiscount,
    insertDiscount,
    updateDiscount,
    removeDiscount
}