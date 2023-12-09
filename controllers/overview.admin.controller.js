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
        const productCount = await getProductCount();
        const totalInventoryProduct = await getTotalInventoryProduct();
        const billPaidCount = await getBillByStatusPaidCount();
        const billWaitConfirmCount = await getBillByStatusWaitConfirmCount();

        // Chart thống kê đơn hàng
        const statusBills = ['Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao hàng', 'Đã giao hàng', 'Đã huỷ'];
        const unpaidBills = [];
        const paidBills = [];

        // Lặp qua mỗi trạng thái giao hàng
        for (const status of statusBills) {
            // Đếm số lượng của mỗi trạng thái giao hàng theo từng trạng thái thanh toán chưa thanh toán ('Chưa thanh toán') và đã thanh toán ('Đã thanh toán')
            const countUnpaid = await billAdminModel.countBillsWithStatus('Chưa thanh toán', status);
            const countPaid = await billAdminModel.countBillsWithStatus('Đã thanh toán', status);

            // Push số lượng đơn hàng chưa thanh toán vào mảng unpaidBills và số lượng đơn hàng đã thanh toán vào mảng paidBills
            unpaidBills.push({ status, count: countUnpaid[0].so_luong_don_hang });
            paidBills.push({ status, count: countPaid[0].so_luong_don_hang });
        }

        // Chuyển mảng số lượng đơn hàng chưa thanh toán và đã thanh toán thành chuỗi JSON
        const unpaidBillsCount = JSON.stringify(unpaidBills.map(item => item.count));
        const paidBillsCount = JSON.stringify(paidBills.map(item => item.count));

        // Chart doanh thu
        const revenues = await getRevenues();

        // Chart sản phẩm tồn kho
        const sumQuantityProductSizes = await getSumQuantityProductSizes();

        // Chart đánh giá
        const reviewCount = await getReviewCount();

        res.render("index", {
            productCount,
            totalInventoryProduct,
            billPaidCount,
            billWaitConfirmCount,
            reviewCount,
            sumQuantityProductSizes,
            unpaidBillsCount,
            paidBillsCount,
            revenues
        });
    } catch (error) {
        handleError(res, error);
    }
}

// Đếm tổng số lượng sản phẩm
const getProductCount = async () => {
    const products = await productAdminModel.getProducts();
    return products.length;
}

// Đếm tổng số lượng tồn kho
const getTotalInventoryProduct = async () => {
    const totalInventoryProduct = await productSizeAdminModel.getTotalInventoryProduct();
    return totalInventoryProduct[0].tong_ton_kho;
}

// Đếm số lượng đơn hàng ở trạng thái đã thanh toán
const getBillByStatusPaidCount = async () => {
    const billsIsPaid = await billAdminModel.getBillsByStatusPay('Đã thanh toán');
    return billsIsPaid.length;
}

// Đếm số lượng đơn hàng ở trạng thái chờ xác nhận
const getBillByStatusWaitConfirmCount = async () => {
    const billsWaitConfirm = await billAdminModel.getBillsByStatusShip('Chờ xác nhận');
    return billsWaitConfirm.length;
}

// Tính doanh thu 12 tháng của các năm
const getRevenues = async () => {
    const results = await billAdminModel.getRevenue();
    return JSON.stringify(results);
}

// Đếm tổng số lượng của mỗi sản phẩm
const getSumQuantityProductSizes = async () => {
    const results = await productSizeAdminModel.getSumQuantityProductSizes();
    return JSON.stringify(results);
}

// Đếm số lượng đánh giá theo từng mức độ điểm
const getReviewCount = async () => {
    const reviews = await reviewAdminModel.getRatingCountsReview();
    return JSON.stringify(reviews.map(item => item.so_luong));
}

module.exports = {
    pageAdminOverView
}