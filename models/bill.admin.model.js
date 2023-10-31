const database = require('../database/database.js');

const getAll = async () => {
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
                        DonHang.hienThi = 1;`;
    return await database.queryDatabase(query, []);
}

const getAllByStatusPay = async (status_paid) => {
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
                        DonHang.hienThi = 1 AND trang_thai_thanh_toan = ?;`;
    return await database.queryDatabase(query, [status_paid]);
}

const getAllByStatusBill = async (status_bill) => {
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
    return await database.queryDatabase(query, [status_bill]);
}

const getBillById = async (id) => {
    const query = `SELECT
                    dh.id as "don_hang_id",
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

const confirm = async (id) => {
    const query = `UPDATE DonHang SET tinh_trang_giao_hang = 'Chờ lấy hàng' WHERE id=? `;
    return await database.queryDatabase(query, [id]);
}

const cancel = async (id, reason) => {
    const query = `UPDATE DonHang SET tinh_trang_giao_hang = 'Đã hủy', ly_do_huy =? WHERE id=?`;
    return await database.queryDatabase(query, [reason, id]);
}

const countBillsWithStatus  = async (trang_thai_thanh_toan, tinh_trang_gh) => {
    const query = `SELECT COUNT(*) AS so_luong_don_hang
    FROM shop_clothes.DonHang
    WHERE trang_thai_thanh_toan = ? AND tinh_trang_giao_hang = ?;
    `;
    return await database.queryDatabase(query, [trang_thai_thanh_toan, tinh_trang_gh])
}


const getRevenue = async () => {
    const query = `SELECT YEAR(dh.ngay_dat) as year_order, 
    MONTH(dh.ngay_dat) as month_order, 
    IFNULL(SUM(dh.thanh_tien), 0) AS tong_doanh_thu
FROM shop_clothes.DonHang dh
WHERE trang_thai_thanh_toan = 'Đã thanh toán'
GROUP BY year_order, month_order
ORDER BY year_order, month_order;
;
    `;
    return await database.queryDatabase(query, [])
}


module.exports = {
    getAll,
    getBillById,
    confirm,
    cancel,
    getAllByStatusPay,
    getAllByStatusBill,
    countBillsWithStatus,
    getRevenue
}