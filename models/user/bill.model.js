const connection = require("../../database/database.js")

// lấy danh sách đơn hàng theo tình trạng đơn hàng, id người dùng, hiển thi = 1
const readBillByStatusId = async (idUser, deliveryStatus) => {

    const query = "SELECT DonHang.id, DonHang.tinh_trang_giao_hang, DonHang.so_luong_don_hang, DonHang.thanh_tien, SanPham.ten_san_pham, SanPham.anh_dai_dien, DonHangChiTiet.don_gia, DonHangChiTiet.kich_thuoc, DonHangChiTiet.so_luong " +
        "FROM DonHang " +
        "JOIN DonHangChiTiet ON DonHang.id = DonHangChiTiet.don_hang_id " +
        "JOIN SanPham ON DonHangChiTiet.san_pham_id = SanPham.id " +
        "JOIN DiaChi ON DonHang.dia_chi_id = DiaChi.id " +
        "WHERE DonHang.hienThi = 1 AND DiaChi.nguoi_dung_id = ? AND DonHang.tinh_trang_giao_hang = ?"

    return await connection.queryDatabase(query, [idUser, deliveryStatus])

}

// lấy danh sách đơn hàng chi tiết theo id đơn hàng và hiển thị = 1
const readBillById = async (id) => {

    const query = "SELECT DonHang.id, DonHang.ghi_chu, DonHang.hinh_thuc_thanh_toan, DonHang.tinh_trang_giao_hang, DonHang.so_luong_don_hang, DonHang.thanh_tien, " +
        "SanPham.ten_san_pham, SanPham.anh_dai_dien, DonHangChiTiet.don_gia, DonHangChiTiet.kich_thuoc, DonHangChiTiet.so_luong, " +
        "DiaChi.ho_va_ten, DiaChi.email, DiaChi.dien_thoai, DiaChi.dia_chi, " +
        "GiamGia.code AS ma_giam_gia, GiamGia.gia_tri " +
        "FROM DonHang " +
        "JOIN DonHangChiTiet ON DonHang.id = DonHangChiTiet.don_hang_id " +
        "JOIN SanPham ON DonHangChiTiet.san_pham_id = SanPham.id " +
        "JOIN DiaChi ON DonHang.dia_chi_id = DiaChi.id " +
        "LEFT JOIN GiamGia ON DonHang.giam_gia_id = GiamGia.id " +
        "WHERE DonHang.hienThi = 1 AND DonHang.id = ?";

    return await connection.queryDatabase(query, [id])

}

// lấy danh sách đơn hàng để đánh giá theo id đơn hàng và hiển thị = 1
const readBillByIdForComment = async (id) => {

    const query = "SELECT SanPham.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, DonHangChiTiet.kich_thuoc " +
        "FROM DonHang " +
        "JOIN DonHangChiTiet ON DonHang.id = DonHangChiTiet.don_hang_id " +
        "JOIN SanPham ON DonHangChiTiet.san_pham_id = SanPham.id " +
        "WHERE DonHang.hienThi = 1 AND DonHang.id = ?";

    return await connection.queryDatabase(query, [id])

}

// hủy đơn hàng -> cập nhật lý do hủy đơn hàng theo id đơn hàng
const cancelBill = async (id, reasonCancel) => {

    const query = "UPDATE DonHang SET ly_do_huy = ? , tinh_trang_giao_hang = 'Đã hủy' WHERE id = ?"

    return await connection.queryDatabase(query, [reasonCancel, id])

}

module.exports = {
    readBillByStatusId,
    cancelBill,
    readBillById,
    readBillByIdForComment
}
