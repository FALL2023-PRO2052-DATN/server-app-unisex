const billAdminModel = require('../models/bill.admin.model.js');

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

const confirmBillFromPageBillDetail = async (req, res) => {
    const { id } = req.params;
    try {
        await billAdminModel.confirm(id);
        req.flash('success', 'Xác nhận đơn hàng thành công.');
        res.redirect('/admin/bill-detail/' + id);
    } catch (error) {
        handleError(res, error);
    }
}

const cancelBillFromPageBillDetail = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    try {
        await billAdminModel.cancel(id, 'Chủ cửa hàng: ' + reason);
        req.flash('success', 'Huỷ đơn hàng thành công');
        res.redirect('/admin/bill-detail/' + id);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminBill,
    confirmBillFromPageBillDetail,
    cancelBillFromPageBillDetail
}