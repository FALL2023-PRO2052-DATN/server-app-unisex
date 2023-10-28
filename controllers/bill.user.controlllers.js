const connection = require("../database/database.js")

const readBillByStatusId = (req, res) => {
    const { idUser, deliveryStatus } = req.body
    const query = "SELECT DonHang.id, DonHang.tinh_trang_giao_hang, SanPham.ten_san_pham, SanPham.anh_dai_dien, DonHangChiTiet.don_gia, DonHangChiTiet.kich_thuoc, DonHangChiTiet.so_luong " +
        "FROM DonHang " +
        "JOIN DonHangChiTiet ON DonHang.id = DonHangChiTiet.don_hang_id " +
        "JOIN SanPham ON DonHangChiTiet.san_pham_id = SanPham.id " +
        "JOIN DiaChi ON DonHang.dia_chi_id = DiaChi.id " +
        "WHERE DonHang.hienThi = 1 AND DiaChi.nguoi_dung_id = ? AND DonHang.tinh_trang_giao_hang = ?"

    connection.con.query(query, [idUser, deliveryStatus], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", billList: results })
        }
    })
}




module.exports = {
    readBillByStatusId
}
