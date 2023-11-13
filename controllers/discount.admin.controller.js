const discountAdminModel = require('../models/discout.admin.model.js');
const arrayHelpers = require('../helpers/array-helpers.js');

const isDiscountExist = (discounts, discountCode) => {
    return discounts.some((discount) => discount.code === discountCode);
}

const renderPageDiscount = async (req, res) => {
    try {
        const discounts = await discountAdminModel.getDiscounts();
        const discountReversed = arrayHelpers.reverseArray(discounts);

        res.status(200).render('discount', { discounts: discountReversed });
    } catch (error) {
        console.error('Render page discount error', error);
    }
}

const insertDiscount = async (req, res) => {
    try {
        const { discountCode, discountValue } = req.body;
        const discounts = await discountAdminModel.getDiscounts();

        if (isDiscountExist(discounts, discountCode)) {
            req.flash('warning', 'Thêm không thành công. Mã code giảm giá đã tồn tại.');
        } else {
            const data = { discountCode, discountValue };
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
        const { discountID, discountCode, discountValue } = req.body;
        const discounts = await discountAdminModel.getDiscounts();
        const discountCurrentToUpdate = discounts.find((discount) => discount.id === parseInt(discountID, 10));
        const discountsExceptCurrent = discounts.filter((discount) => discount !== discountCurrentToUpdate);

        if (isDiscountExist(discountsExceptCurrent, discountCode)) {
            req.flash('warning', 'Cập nhật không thành công. Mã code giảm giá đã tồn tại.');
        } else {
            const data = { discountID, discountCode, discountValue };
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
        const { discountID } = req.body;
        await discountAdminModel.removeDiscount(discountID);
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