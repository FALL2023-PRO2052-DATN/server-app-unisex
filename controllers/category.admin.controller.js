const database = require('../database/database.js');

// Lấy danh sách danh mục sản phẩm
const pageCategory = (req, res) => {
    const query = `
        SELECT
            dm.id AS id_danh_muc,
            dm.ten_danh_muc AS ten_danh_muc,
            COUNT(sp.id) AS so_luong_san_pham
        FROM
            shop_clothes.DanhMuc AS dm
        LEFT JOIN
            shop_clothes.SanPham AS sp ON dm.id = sp.danh_muc_id AND sp.hienThi = 1
        WHERE
            dm.hienThi = 1
        GROUP BY
            dm.id`;

    database.con.query(query, function (err, data, fields) {
        if (err) {
            return console.log(err);
        };
        res.render('category', { data });
    });
}
// Thêm danh mục sản phẩm
const create = (req, res) => {
    const { ten_danh_muc } = req.body;
    const query = `INSERT INTO DanhMuc (ten_danh_muc) VALUES (?)`;

    database.con.query(query, [ten_danh_muc], function (err, result) {
        if (err) {
            req.flash('error', 'Thêm danh mục không thành công. Vui lòng thử lại!')
        } else {
            req.flash('success', 'Thêm danh mục thành công')
        }
        res.redirect('/admin/category');
    });
}
// Cập nhật danh mục sản phẩm
const update = (req, res) => {
    const { id_danh_muc, ten_danh_muc } = req.body;
    const query = `UPDATE DanhMuc SET ten_danh_muc =? WHERE id=?`;

    database.con.query(query, [ten_danh_muc, id_danh_muc], function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result.affectedRows === 0) {
            req.flash('error', 'Thêm danh mục không thành công. Vui lòng thử lại !')
        } else {
            req.flash('success', 'Cập nhật danh mục thành công')
        }
        res.redirect('/admin/category');
    });
}
// Xoá danh mục sản phẩm
const remove = (req, res) => {
    const { id_danh_muc } = req.body;
    const query = `UPDATE DanhMuc SET hienThi = 0 WHERE id=?`;

    database.con.query(query, [id_danh_muc], function (err, result) {
        if (err) {
            return console.log(err);
        }

        if (result.affectedRows === 0) {
            req.flash('error', 'Xoá danh mục không thành công. Vui lòng thử lại!')
        } else {
            req.flash('success', 'Xoá danh mục thành công')
        }
        res.redirect('/admin/category');
    });
}

module.exports = {
    pageCategory,
    create,
    update,
    remove
}