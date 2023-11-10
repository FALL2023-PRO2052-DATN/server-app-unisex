const discountAdminModel = require('../models/discout.admin.model.js');
const arrHelpers = require('../helpers/array-helpers.js');

const isDiscountExist = (discounts, code) => {
    return discounts.some((discount) => discount.code === code);
}

const renderPageDiscount = async (req, res) => {
    try {
        const discounts = await discountAdminModel.getDiscounts();
        const discountReversed = arrHelpers.reverseArray(discounts);
        res.status(200).render('discount', { discounts: discountReversed });
    } catch (error) {
        console.error('Render page discount error', error);
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
            await discountAdminModel.insertDiscount(data);
            req.flash('success', 'Thêm mã giảm giá thành công.');
        }

        res.status(200).redirect('/admin/discount');
    } catch (error) {
        console.error('Insert discount error', error);
    }
}

const updateDiscount = async (req, res) => {
    try {
        const { id, code, value } = req.body;
        const discounts = await discountAdminModel.getDiscounts();
        // Mã giảm giá cần cập nhật
        const discountToUpdate = discounts.find((discount) => discount.id === parseInt(id, 10));
        // Danh sách mã giảm giá trừ mã giảm giá cần cập nhật
        const discountsExceptCurrent = discounts.filter((discount) => discount !== discountToUpdate);

        if (isDiscountExist(discountsExceptCurrent, code)) {
            req.flash('warning', 'Cập nhật không thành công. Mã code giảm giá đã tồn tại.');
        } else {
            const data = { code, value, id };
            await discountAdminModel.updateDiscount(data);
            req.flash('success', 'Cập nhật mã giảm giá thành công.');
        }

        res.status(200).redirect('/admin/discount');
    } catch (error) {
        console.error('Update discount error', error);
    }
}

const removeDiscount = async (req, res) => {
    try {
        const { id } = req.body;
        await discountAdminModel.removeDiscount(id);
        req.flash('success', 'Xoá mã giảm giá thành công.');
        res.redirect('/admin/discount');
    } catch (error) {
        console.error('Remove discount error', error);
    }
}

module.exports = {
    renderPageDiscount,
    insertDiscount,
    updateDiscount,
    removeDiscount
}