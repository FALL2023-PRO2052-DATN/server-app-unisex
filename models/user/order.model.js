const connection = require("../../database/database.js")

// thêm đơn hàng
const insertDonHang =
    async (id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang, ly_do_huy, thanh_tien, giam_gia_id, dia_chi_id, trang_thai_thanh_toan, so_luong_don_hang) => {

        const giamGiaId = giam_gia_id ? giam_gia_id : null;

        const insertDonHangQuery = "INSERT INTO DonHang(" +
            "id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang, ly_do_huy, " +
            "thanh_tien, giam_gia_id, dia_chi_id, trang_thai_thanh_toan, so_luong_don_hang) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return await connection.queryDatabase(insertDonHangQuery,
            [id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang,
                ly_do_huy, thanh_tien, giamGiaId, dia_chi_id,
                trang_thai_thanh_toan, so_luong_don_hang])

    }

// thêm đơn hàng chi tiết
const insertDonHangDetail = async (kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id) => {

    const insertDonHangChiTietQuery = "INSERT INTO DonHangChiTiet(kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id) VALUES (?, ?, ?, ?, ?)";
    return await connection.queryDatabase(insertDonHangChiTietQuery,
        [kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id])

}



module.exports = {
    insertDonHang,
    insertDonHangDetail
}
