const billAdminModel = require('../models/bill.admin.model.js');

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminBill = async (req, res) => {
    try {
        const bills = await billAdminModel.getAll();
        console.log(bills);
        res.status(200).render('bill', { bills });
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminBill
}