const connection = require("../database/database.js")

const insertDonHang = (req, res) => {
    const { id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang, ly_do_huy, thanh_tien, giam_gia_id, dia_chi_id, trang_thai_thanh_toan } = req.body;
    const giamGiaId = giam_gia_id ? giam_gia_id : null;
    // Thêm đơn hàng
    const insertDonHangQuery = "INSERT INTO DonHang(id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang, ly_do_huy, thanh_tien, giam_gia_id, dia_chi_id, trang_thai_thanh_toan) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.con.query(insertDonHangQuery,
        [id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang, ly_do_huy, thanh_tien, giamGiaId, dia_chi_id, trang_thai_thanh_toan],
        (err, results) => {
            if (err) {
                res.json({ status: "ERROR", err })
            } else {
                res.json({ status: "SUCCESS" })
            }
        })
}


const insertDonHangDetail = (req, res) => {
    const { kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id } = req.body;
    // Thêm đơn hàng chi tiết
    const insertDonHangChiTietQuery = "INSERT INTO DonHangChiTiet(kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id) VALUES (?, ?, ?, ?, ?)";
    connection.con.query(insertDonHangChiTietQuery,
        [kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id],
        (err, results) => {
            if (err) {
                res.json({ status: "ERROR", err: err.sqlMessage });
            } else {
                res.json({ status: "SUCCESS" });
            }
        });
}



module.exports = {
    insertDonHang,
    insertDonHangDetail
}
