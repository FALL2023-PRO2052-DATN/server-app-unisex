const database = require('../database/database.js');

// Danh sách sản phẩm
const pageProduct = (req, res) => {
    const query = `SELECT
            SP.id AS san_pham_id,
            SP.anh_dai_dien AS hinh_anh,
            SP.ten_san_pham,
            SP.gia_ban,
            SP.giam_gia,
            SP.noi_bat,
            SP.moi_nhat,
            SP.mo_ta_chi_tiet,
            DM.ten_danh_muc,
            GROUP_CONCAT(KT.ten_kich_thuoc SEPARATOR ', ') AS kich_thuoc
            FROM SanPham SP
            INNER JOIN DanhMuc DM ON SP.danh_muc_id = DM.id
            LEFT JOIN KichThuoc_SanPham KTS ON SP.id = KTS.san_pham_id AND KTS.hienThi = 1
            LEFT JOIN KichThuoc KT ON KTS.kich_thuoc_id = KT.id
            WHERE SP.hienThi = 1
            GROUP BY SP.id`;
    database.con.query(query, function (err, data, fields) {
        if (err) {
            return console.log(err);
        };
        res.render('product', { data });
    });
}

module.exports = {
    pageProduct
}