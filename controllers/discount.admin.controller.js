const database = require('../database/database.js');

// Lấy danh sách mã giảm giá
const pageDiscount = (req, res) => {
    const query = `SELECT * FROM GiamGia where hienThi = 1;`;

    database.con.query(query, function (err, data, fields) {
        if (err) {
            return console.log(err);
        };
        res.render('discount', { data });
    });
}

// Thêm mã giảm giá
const create = (req, res) => {
    const { code, gia_tri } = req.body;
    const query = `INSERT INTO GiamGia(code, gia_tri) VALUES (?, ?)`;

    database.con.query(query, [code, gia_tri], function (err, data, fields) {
        if (err) {
            req.flash('error', 'Thêm mã giảm giá không thành công');
        } else {
            req.flash('success', 'Thêm mã giảm giá thành công');
        }
        res.redirect('/admin/discount');
    });
}

// Cập nhật mã giảm giá
const update = (req, res) => {
    const { id_giam_gia, code, gia_tri } = req.body;
    const query = `UPDATE GiamGia SET code=?, gia_tri=? WHERE id=?`;

    database.con.query(query, [code, gia_tri, id_giam_gia], function (err, result) {
        if (err) {
            req.flash('error', 'Cập nhật mã giảm giá không thành công. Mã giảm giá đã tồn tại!');
        } else {
            if (result.affectedRows === 0) {
                req.flash('error', 'Cập nhật mã giảm giá không thành công. Vui lòng thử lại!');
            } else {
                req.flash('success', 'Cập nhật mã giảm giá thành công');
            }
        }
        res.redirect('/admin/discount');
    });
}

// Xoá mã giảm giá 
const remove = (req, res) => {
    const { id_giam_gia } = req.body;
    const query = `UPDATE GiamGia SET hienThi = 0 WHERE id=?`;

    database.con.query(query, [id_giam_gia], function (err, result) {
        if (err) {
            return console.log(err);
        }

        if (result.affectedRows === 0) {
            req.flash('error', 'Xoá mã giảm giá không thành công. Vui lòng thử lại!');
        } else {
            req.flash('success', 'Xoá mã giảm giá thành công');
        }
        res.redirect('/admin/discount');
    });
}
module.exports = {
    pageDiscount,
    create,
    update,
    remove
}