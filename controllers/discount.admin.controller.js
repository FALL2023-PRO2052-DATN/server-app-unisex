const discountModel = require('../models/discout.admin.model.js');

const pageDiscount = async (req, res) => {
    try {
        const discounts = await discountModel.getAll();
        res.render('discount', { discounts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

const insertDiscount = async (req, res) => {
    try {
        const { codeDiscount, valueDiscount } = req.body;
        const discounts = await discountModel.getAll();

        // Kiểm tra mã giảm giá có tồn tại hay không
        const isCodeExist = discounts.some((discount) => discount.code === codeDiscount);

        if (isCodeExist) {
            req.flash('warning', 'Thêm mã giảm giá không thành công. Mã code giảm giá đã tồn tại');
        } else {
            const data = { codeDiscount, valueDiscount };
            await discountModel.insert(data);
            req.flash('success', 'Thêm mã giảm giá thành công');
        }
        res.redirect('/admin/discount');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Thêm mã giảm giá không thành công');
        res.redirect('/admin/discount');
    }
}

const updateDiscount = async (req, res) => {
    try {
        const { idDiscount, codeDiscount, valueDiscount } = req.body;
        const discounts = await discountModel.getAll();

        // Lấy danh sách mã giảm giá trừ mã giảm giá hiện tại
        const discountsExceptCurrent = discounts.filter((discount) => discount.id !== parseInt(idDiscount, 10));

        // Kiểm tra mã giảm giá khi cập nhật cón tồn tại trong discountsExceptCurrent
        const isCodeExist = discountsExceptCurrent.some((discount) => discount.code === codeDiscount);

        if (isCodeExist) {
            req.flash('warning', 'Cập nhật mã giảm giá không thành công. Mã code giảm giá đã tồn tại');
        } else {
            const data = {
                codeDiscount,
                valueDiscount,
                idDiscount
            }
            await discountModel.update(data);
            req.flash('success', 'Cập nhật mã giảm giá thành công');
        }

        res.redirect('/admin/discount');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Cập nhật mã giảm giá không thành công');
        res.redirect('/admin/discount');
    } 
}

const removeDiscount = async (req, res) => {
    try {
        const { idDiscount } = req.body;
        await discountModel.remove(idDiscount);
        req.flash('success', 'Xoá mã giảm giá thành công');
        res.redirect('/admin/discount');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

module.exports = {
    pageDiscount,
    insertDiscount,
    updateDiscount,
    removeDiscount
}