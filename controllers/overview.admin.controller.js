const productAdminModel = require('../models/admin/product.model.js');
const productSizeAdminModel = require('../models/admin/product-size.model.js');
const billAdminModel = require('../models/admin/bill.model.js');
const reviewAdminModel = require('../models/admin/reviews.model.js');

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminOverView = async (req, res) => {
    try {
        // Lấy danh sách sản phẩm
        const products = await productAdminModel.getProducts();
        // Đếm số lượng sản phẩm tồn kho
        const getTotalStock = await productSizeAdminModel.getTotalStock();
        const tong_ton_kho = getTotalStock[0].tong_ton_kho;
        // Lấy tổng đơn thanh toán
        const billsIsPaid = await billAdminModel.getAllByStatusPay('Đã thanh toán');
        // Lấy danh sách đơn hàng chờ xác nhận
        const billsUnConfirm = await billAdminModel.getAllByStatusBill('Chờ xác nhận');
        // Lấy danh sách đánh giá
        const reviews = await reviewAdminModel.getRatingCountsReview();
        // Chuyển thành str để gửi qua script
        const ratingCount = JSON.stringify(reviews.map(item => item.so_luong));
        // Lấy sản phẩm và số lượng tồn kho 
        const productStockByGroup = await productSizeAdminModel.getProductStockByGroup();
        // Chuyển thành str để gửi qua script
        const productStockByGroupStr = JSON.stringify(productStockByGroup);
        // Danh sách đơn hàng chưa thanh toán với các trạng thái 
        const statusBills = ['Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao hàng', 'Đã giao hàng', 'Đã huỷ'];
        const unpaidBills = [];

        for (const status of statusBills) {
            const countResult = await billAdminModel.countBillsWithStatus('Chưa thanh toán', status);
            const count = countResult[0].so_luong_don_hang;
            unpaidBills.push({ status, count });
        }
        // Đếm đơn với trạng thái chưa thanh toán
        const unpaidBillsCount = JSON.stringify(unpaidBills.map(item => item.count));

        // Đếm đơn với trạng thái đã thanh toán
        const paidBills = [];

        for (const status of statusBills) {
            const countResult1 = await billAdminModel.countBillsWithStatus('Đã thanh toán', status);
            const count = countResult1[0].so_luong_don_hang;
            paidBills.push({ status, count });
        }
        // Đếm đơn với trạng thái chưa thanh toán
        const paidBillsCount = JSON.stringify(paidBills.map(item => item.count));

        // Tính doanh thu 12 tháng năm 2023
        const annualRevenue = await calculateAnnualRevenue(2023);
        const annualRevenues = JSON.stringify(annualRevenue);

        res.render("index", { products, tong_ton_kho, billsIsPaid, billsUnConfirm, ratingCount, productStockByGroupStr, unpaidBillsCount, paidBillsCount, annualRevenues });
    } catch (error) {
        handleError(res, error);
    }
}

const calculateAnnualRevenue = async (year) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // Tạo mảng từ 1 đến 12 để đại diện cho 12 tháng

    var annualRevenue = [];

    const revenue = await billAdminModel.getRevenue();
    annualRevenue = revenue;

    return annualRevenue;
};

module.exports = {
    pageAdminOverView
}