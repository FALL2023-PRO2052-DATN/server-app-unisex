const billAdminModel = require('../models/bill.admin.model.js');
const billDetailAdminModel = require('../models/bill-detail.admin.model.js');

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminBill = async (req, res) => {
    try {
        const bills = await billAdminModel.getAll();
        res.status(200).render('bill', { bills });
    } catch (error) {
        handleError(res, error);
    }
}

const pageBillDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const billById = await billAdminModel.getBillById(id);
        const billsDetail = await billDetailAdminModel.getBillsDetailByBillId(id);
        res.render('bill-detail', { bill: billById[0], billsDetail });
    } catch (error) {
        handleError(res, error);
    }
}

const confirmBill = async (req, res) => {
    const { id } = req.params;
    try {
        await billAdminModel.confirm(id);
        req.flash('success', 'Xác nhận đơn hàng thành công.');
        res.redirect('/admin/bill/' + id);
    } catch (error) {
        handleError(res, error);
    }
}

const cancelBill = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    try {
        await billAdminModel.cancel(id, 'Chủ cửa hàng: ' + reason);
        req.flash('success', 'Huỷ đơn hàng thành công');
        res.redirect('/admin/bill/' + id);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminBill,
    pageBillDetail,
    confirmBill,
    cancelBill
}