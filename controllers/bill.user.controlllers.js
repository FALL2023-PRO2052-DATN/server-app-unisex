const connection = require("../database/database.js")

const readBillByStatusId = (req, res) => {
    const { idUser, deliveryStatus } = req.body
    const query = "SELECT DonHang.id, DonHang.tinh_trang_giao_hang, DonHang.so_luong_don_hang, DonHang.thanh_tien, SanPham.ten_san_pham, SanPham.anh_dai_dien, DonHangChiTiet.don_gia, DonHangChiTiet.kich_thuoc, DonHangChiTiet.so_luong " +
        "FROM DonHang " +
        "JOIN DonHangChiTiet ON DonHang.id = DonHangChiTiet.don_hang_id " +
        "JOIN SanPham ON DonHangChiTiet.san_pham_id = SanPham.id " +
        "JOIN DiaChi ON DonHang.dia_chi_id = DiaChi.id " +
        "WHERE DonHang.hienThi = 1 AND DiaChi.nguoi_dung_id = ? AND DonHang.tinh_trang_giao_hang = ?"

    connection.con.query(query, [idUser, deliveryStatus], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {

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
        }
    })
}

const readBillById = (req, res) => {
    const { id } = req.body
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

    connection.con.query(query, [id], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", billList: results })
        }
    })
}

const readBillByIdForComment = (req, res) => {
    const { id } = req.body
    const query = "SELECT SanPham.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, DonHangChiTiet.kich_thuoc " +
        "FROM DonHang " +
        "JOIN DonHangChiTiet ON DonHang.id = DonHangChiTiet.don_hang_id " +
        "JOIN SanPham ON DonHangChiTiet.san_pham_id = SanPham.id " +
        "WHERE DonHang.hienThi = 1 AND DonHang.id = ?";

    connection.con.query(query, [id], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", productList: results })
        }
    })
}

const cancelBill = (req, res) => {
    const { id, reasonCancel } = req.body
    const query = "UPDATE DonHang SET ly_do_huy = ? , tinh_trang_giao_hang = 'Đã hủy' WHERE id = ?"

    connection.con.query(query, [reasonCancel, id], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS" })
        }
    })
}

module.exports = {
    readBillByStatusId,
    cancelBill,
    readBillById,
    readBillByIdForComment
}
