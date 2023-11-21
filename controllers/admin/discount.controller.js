const discountModel = require('../../models/admin/discoun.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');

const isDiscountExist = (discounts, discountCode) => {
  return discounts.some((discount) => discount.code === discountCode);
}

const renderPageDiscount = async (req, res) => {
  try {
    const discounts = await discountModel.getDiscounts();
    const discountReversed = arrayHelpers.reverseArray(discounts);
    res.status(200).render('discount', { discounts: discountReversed });
  } catch (error) {
    console.error('Render page discount failed', error);
  }
}

const insertDiscount = async (req, res) => {
  try {
    const { discountCode, discountValue } = req.body;
    const discounts = await discountModel.getDiscounts();

    if (isDiscountExist(discounts, discountCode)) {
      req.flash('warning', 'Thêm không thành công. Mã code giảm giá đã tồn tại.');
    } else {
      const data = { discountCode, discountValue };
      await discountModel.insertDiscount(data);
      req.flash('success', 'Thêm mã giảm giá thành công.');
    }

    res.status(200).redirect('/admin/discount');
  } catch (error) {
    console.error('Inserter discount error', error);
  }
}

const updateDiscount = async (req, res) => {
  try {
    const discountID = req.params.discountID;
    const { discountCode, discountValue } = req.body;
    const discounts = await discountModel.getDiscounts();

    const discountCurrentToUpdate = discounts.find((discount) => {
      return discount.id === parseInt(discountID, 10)
    });

    const discountsExceptCurrent = discounts.filter((discount) => {
      return discount !== discountCurrentToUpdate;
    });

    if (isDiscountExist(discountsExceptCurrent, discountCode)) {
      req.flash('warning', 'Cập nhật không thành công. Mã code giảm giá đã tồn tại.');
    } else {
      const data = { discountID, discountCode, discountValue };
      await discountModel.updateDiscount(data);
      req.flash('success', 'Cập nhật mã giảm giá thành công.');
    }

    res.status(200).redirect('/admin/discount');
  } catch (error) {
    console.error('Update discount failed', error);
  }
}

const removeDiscount = async (req, res) => {
  try {
    const discountID = req.params.discountID;
    await discountModel.removeDiscount(discountID);
    req.flash('success', 'Xoá mã giảm giá thành công.');
    res.redirect('/admin/discount');
  } catch (error) {
    console.error('Removing discount failed', error);
  }
}

module.exports = {
  renderPageDiscount,
  insertDiscount,
  updateDiscount,
  removeDiscount
}