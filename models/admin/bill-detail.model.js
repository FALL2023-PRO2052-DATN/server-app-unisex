const database = require('../../database/database.js');

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
    getBillsDetailByBillId
}