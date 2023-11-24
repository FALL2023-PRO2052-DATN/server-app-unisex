const model = require("../../models/user/bill.model")

const readBillByStatusId = async (req, res) => {

    try {
        const { idUser, deliveryStatus } = req.body
        const results = await model.readBillByStatusId(idUser, deliveryStatus)

        // Sử dụng Set để loại bỏ các id trùng lặp từ mảng results
        const uniqueBillIds = new Set();
        const uniqueBillData = results.filter(result => {
            if (!uniqueBillIds.has(result.id)) {
                uniqueBillIds.add(result.id);
                return true;
            }
            return false;
        });

        res.json({ status: "SUCCESS", billList: uniqueBillData })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const readBillById = async (req, res) => {

    try {
        const { id } = req.body
        const results = await model.readBillById(id)
        res.json({ status: "SUCCESS", billList: results })
    } catch (error) {
        r
        es.json({ status: "ERROR", error })
    }
}

const readBillByIdForComment = async (req, res) => {

    try {
        const { id } = req.body
        const results = await model.readBillByIdForComment(id)
        res.json({ status: "SUCCESS", productList: results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const cancelBill = async (req, res) => {

    try {
        const { id, reasonCancel } = req.body
        const results = await model.cancelBill(id, reasonCancel)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

module.exports = {
    readBillByStatusId,
    cancelBill,
    readBillById,
    readBillByIdForComment
}
