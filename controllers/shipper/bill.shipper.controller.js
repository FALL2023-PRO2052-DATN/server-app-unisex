const billShipperModel = require('../../models/shipper/bill.shipper.model');

const getAllByStatusBillWaitConfirm = async (req, res) => {
    try {
        const results = await billShipperModel.getAllByStatusBillWaitConfirm();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const getBillById = async (req, res) => {
    try {
        const {id} = req.body; 
        const results = await billShipperModel.getBillById(id);
        res.json(results[0]);
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const getAllByIdShipperAndStatusBill = async (req, res) => {
    try {
        const {statusBill, idShipper} = req.body; 
        const results = await billShipperModel.getAllByIdShipperAndStatusBill(statusBill,idShipper);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}


const updateBill = async (req, res) => {
    try {
        const {idShipper, idBill, billStatus, statusPay} = req.body; 
        const results = await billShipperModel.updateBill(billStatus,idShipper,idBill,statusPay);
        res.json({status: 'success'});
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const getBillsDetailByBillId = async (req, res) => {
    try {
        const {idBill} = req.body; 
        const results = await billShipperModel.getBillsDetailByBillId(idBill);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}


module.exports = {
    getAllByStatusBillWaitConfirm,
    getBillById,
    updateBill,
    getAllByIdShipperAndStatusBill,
    getBillsDetailByBillId
}
