const billShipperModel = require('../../models/shipper/bill.shipper.model');
const productSizeModel = require('../../models/shipper/product-size.model.js');

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
        const { id } = req.body;
        const results = await billShipperModel.getBillById(id);
        res.json(results[0]);
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const getAllByIdShipperAndStatusBill = async (req, res) => {
    try {
        const { statusBill, idShipper } = req.body;
        const results = await billShipperModel.getAllByIdShipperAndStatusBill(statusBill, idShipper);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}


const updateBill = async (req, res) => {
    try {
        const { idShipper, idBill, billStatus, statusPay } = req.body;
        await billShipperModel.updateBill(billStatus, idShipper, idBill, statusPay);
        if (billStatus == 'Đã giao hàng') {
            const billDetails = await billShipperModel.getBillsDetailByBillId(idBill);
            // Cập nhật lại sô lượng sản phẩm nếu có
            billDetails.forEach(async product => {
                const quantityOrder = product.so_luong;
                const productID = product.san_pham_id;
                const nameSize = product.kich_thuoc;

                const productSizes = await productSizeModel.getProductSizes();
                // Lấy thong tin product theo mã sản phẩm và tên kích thước trong đơn hàng chi tiết 
                const productSizeObject = productSizes.find(productSize => productSize.san_pham_id === productID && productSize.ten_kich_thuoc === nameSize);
                if (productSizeObject) {
                    const quantity = productSizeObject.so_luong_ton_kho - quantityOrder
                    // Cập nhạt lại số lượng theo productSizeObject đã tìm thấy
                    await productSizeModel.updateQuantityProductSize({
                        quantity,
                        productSizeID: productSizeObject.id
                    });
                }
            });
            const bill = await billShipperModel.getBillById(idBill);

            // Socket realtime notification android
            const notificationData = {
                orderId: idBill,
                message: "Đơn hàng " + idBill + " của bạn đã giao thành công",
                userId: bill[0].nguoi_dung_id
                // Thêm các trường dữ liệu khác nếu cần thiết
            };
            req.io.emit('notification', notificationData);
        }
        res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const getBillsDetailByBillId = async (req, res) => {
    try {
        const { idBill } = req.body;
        const results = await billShipperModel.getBillsDetailByBillId(idBill);
        console.log("🚀 ~ file: bill.shipper.controller.js:51 ~ getBillsDetailByBillId ~ results:", results)


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
