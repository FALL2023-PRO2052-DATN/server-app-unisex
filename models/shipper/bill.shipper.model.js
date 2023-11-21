const database = require('../../database/database.js');

const getAllByStatusBillWaitConfirm = async () => {
    const status = 'Chờ lấy hàng'
    const query = `SELECT
                        DonHang.*,
                        DiaChi.nguoi_dung_id
                    FROM
                        shop_clothes.DonHang
                    JOIN
                        shop_clothes.DiaChi
                    ON
                        DonHang.dia_chi_id = DiaChi.id
                    WHERE
                        DonHang.hienThi = 1 AND tinh_trang_giao_hang = ?;`;
    return await database.queryDatabase(query, [status]);
}

const getBillById = async (id) => {
    const query = `SELECT
                    dh.id,
                    dh.ngay_dat,
                    dh.ghi_chu,
                    dh.hinh_thuc_thanh_toan,
                    dh.tinh_trang_giao_hang,
                    dh.ly_do_huy,
                    dh.thanh_tien,
                    dh.giam_gia_id,
                    dh.trang_thai_thanh_toan,
                    dc.id as "dia_chi_id",
                    dc.ho_va_ten,
                    dc.email,
                    dc.dia_chi,
                    dc.mac_dinh,
                    dc.dien_thoai,
                    dc.nguoi_dung_id,
                    gg.code,
                    gg.gia_tri
                FROM
                    shop_clothes.DonHang AS dh
                LEFT JOIN
                    shop_clothes.DiaChi AS dc ON dh.dia_chi_id = dc.id
                LEFT JOIN
                    shop_clothes.GiamGia AS gg ON dh.giam_gia_id = gg.id
                WHERE
                    dh.id = ? AND dh.hienThi;`;
    return await database.queryDatabase(query, [id]);
}

const getAllByIdShipperAndStatusBill = async (statusBill, idShipper) => {
    const query = `SELECT
                        DonHang.*,
                        DiaChi.nguoi_dung_id
                    FROM
                        shop_clothes.DonHang
                    JOIN
                        shop_clothes.DiaChi
                    ON
                        DonHang.dia_chi_id = DiaChi.id
                    WHERE
                        DonHang.hienThi = 1 AND tinh_trang_giao_hang = ? AND nhan_vien_id=?;`;
    return await database.queryDatabase(query, [statusBill, idShipper]);
}

// Shipper nhận đơn
const updateBill = async (billStatus, idShipper, idBill, statusPay) => {
    const query = `UPDATE DonHang SET tinh_trang_giao_hang = ?, trang_thai_thanh_toan = ? , nhan_vien_id = ? WHERE id = ?`;
    return await database.queryDatabase(query, [billStatus, statusPay, idShipper, idBill]);
}

const getBillsDetailByBillId = async (idBill) => {
    const query = `
        SELECT
            dhct.id AS don_hang_chi_tiet_id,
            dhct.kich_thuoc,
            dhct.so_luong,
            dhct.don_gia,
            dhct.san_pham_id,
            sp.anh_dai_dien,
            sp.ten_san_pham,
            sp.gia_ban,
            sp.giam_gia
        FROM DonHangChiTiet AS dhct
        JOIN SanPham AS sp ON dhct.san_pham_id = sp.id
        WHERE dhct.hienThi = 1 AND dhct.don_hang_id = ?`;
    return await database.queryDatabase(query, [idBill]);
}

module.exports = {
    getAllByStatusBillWaitConfirm,
    getBillById,
    updateBill,
    getAllByIdShipperAndStatusBill,
    getBillsDetailByBillId
}