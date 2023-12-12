const billAdminModel = require('../../models/admin/bill.model.js');
const notificationModel = require('../../models/admin/notification.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');

const handleError = (res, error) => {
  console.error(error);
  res.status(500).send('Server error: ' + error.message);
}

const renderPageBill = async (req, res) => {
  try {
    const bills = await billAdminModel.getAll();
    const billsReversed = arrayHelpers.reverseArray(bills);
    res.status(200).render('bill', {
      bills: billsReversed
    });
  } catch (error) {
    handleError(res, error);
  }
}

const confirmBillFromPageBillDetail = async (req, res) => {
  const { id } = req.params;
  try {
    await billAdminModel.confirmBill(id);
    // Tạo thông cho đơn hàng được xác nhấn
    const bills = await billAdminModel.getAll();
    const billToConfirm = bills.find((bill) => {
      return bill.id === id;
    });
    console.log("🚀 ~ file: bill.controller.js:31 ~ billToConfirm ~ billToConfirm:", billToConfirm)
    const data = {
      content: 'Đơn hàng của bạn đã được xác nhận',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png',
      title: 'Đơn hàng ' + id,
      userID: billToConfirm.nguoi_dung_id
    };
    await notificationModel.insertNotification(data);

    const notificationData = {
      orderId: id,
      message: "Đơn hàng " + id + " của bạn đã được xác nhận",
      userId: billToConfirm.nguoi_dung_id
    };
    // Socket realtime notification android
    req.io.emit('notification', notificationData);
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
    await billAdminModel.cancelBill(id, 'Chủ cửa hàng: ' + reason);
    // Tạo thông báo cho đơn hàng đã huỷ
    const bills = await billAdminModel.getAll();
    const billToConfirm = bills.find((bill) => {
      return bill.id === id;
    });
    const data = {
      content: 'Đơn hàng của bạn đã bị huỷ từ chủ của hàng.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/2198px-Error.svg.png',
      title: 'Đơn hàng ' + id,
      userID: billToConfirm.nguoi_dung_id
    };
    await notificationModel.insertNotification(data);
    // Socket realtime notification android
    const notificationData = {
      orderId: id,
      message: "Đơn hàng " + id + " của bạn đã bị huỷ từ chủ của hàng",
      userId: billToConfirm.nguoi_dung_id
      // Thêm các trường dữ liệu khác nếu cần thiết
    };
    req.io.emit('notification', notificationData);
    req.flash('success', 'Huỷ đơn hàng thành công');
    res.redirect('/admin/bill-detail/' + id);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  renderPageBill,
  confirmBillFromPageBillDetail,
  cancelBillFromPageBillDetail
}