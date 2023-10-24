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

module.exports = {
    getAll,
    getBillById,
    confirm,
    cancel
}