const billAdminModel = require('../models/bill.admin.model.js');
const billDetailAdminModel = require('../models/bill-detail.admin.model.js');

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

module.exports = {
    pageBillDetail
}