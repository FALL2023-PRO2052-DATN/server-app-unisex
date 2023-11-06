const router = require('express').Router();
const billShipperController = require('../../controllers/shipper/bill.shipper.controller.js'); 

router.post('/bills/wait-confirm', billShipperController.getAllByStatusBillWaitConfirm);
router.post('/bill-by-id', billShipperController.getBillById);
router.put('/update-bill', billShipperController.updateBill);
router.post('/billsByIdShipperAndStatus', billShipperController.getAllByIdShipperAndStatusBill);
router.post('/getBillsDetailByBillId', billShipperController.getBillsDetailByBillId);

module.exports = router;