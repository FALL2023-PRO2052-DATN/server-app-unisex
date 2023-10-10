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

// Xoá sản phẩm
const remove = (req, res) =>{
    const {id_san_pham} = req.body;
    const query = `UPDATE SanPham SET hienThi = 0 WHERE id=?`;

    database.con.query(query, [id_san_pham], function (err, result) {
        if (err) {
            return console.log(err);
        }

        if (result.affectedRows === 0) {
            req.flash('error', 'Xoá sản không thành công. Vui lòng thử lại!');
        } else {
            // Xoá quản lý tồn kho thuộc sản phẩm đó
            const query = `UPDATE KichThuoc_SanPham SET hienThi = 0 WHERE san_pham_id=?`;
        
            database.con.query(query, [id_san_pham], function (err, result) {
                if (err) {
                    return console.log(err);
                }
                req.flash('success', 'Xoá sản phẩm thành công');
                res.redirect('/admin/product');
            });
        }
    });
}

module.exports = {
    pageProduct,
    remove
}