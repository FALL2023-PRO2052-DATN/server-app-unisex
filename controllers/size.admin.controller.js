const database = require('../database/database.js');

// Lấy danh sách kích thước
const pageSize = (req, res) => {
    const query = `SELECT * FROM KichThuoc WHERE hienThi = 1`;
    
    database.con.query(query, function (err, data, fields) {
        if (err) {
            return console.log(err);
        };
        res.render('size', { data });
    });
}

// Thêm kích thước
const create = (req, res) => {
    const { ten_kich_thuoc, mo_ta_chi_tiet } = req.body;
    const query = `INSERT INTO KichThuoc (ten_kich_thuoc, mo_ta_chi_tiet) VALUES (?, ?)`;

    database.con.query(query, [ten_kich_thuoc, mo_ta_chi_tiet], function (err, result) {
        if (err) {
            req.flash('error', 'Thêm kích thước không thành công!')
        } else {
            req.flash('success', 'Thêm danh mục thành công')
        }
        res.redirect('/admin/size');
    });
}

// Cập nhật kích thước
const update = (req, res) => {
    const { id_kich_thuoc, ten_kich_thuoc, mo_ta_chi_tiet } = req.body;
    const query = `UPDATE KichThuoc SET ten_kich_thuoc=?, mo_ta_chi_tiet=? WHERE id=?`;

    database.con.query(query, [ten_kich_thuoc, mo_ta_chi_tiet, id_kich_thuoc], function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result.affectedRows === 0) {
            req.flash('error', 'Cập nhật kích thước không thành công. Vui lòng thử lại!');
        } else {
            req.flash('success', 'Cập nhật kích thước thành công');
        }
        res.redirect('/admin/size');
    });
}
// Xoá kích thước
const remove = (req, res) => {
    const { id_kich_thuoc } = req.body;
    const query = `UPDATE KichThuoc SET hienThi = 0 WHERE id=?`;

    database.con.query(query, [id_kich_thuoc], function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result.affectedRows === 0) {
            req.flash('error', 'Xoá kích thước không thành công. Vui lòng thử lại!')
        } else {
            req.flash('success', 'Xoá kích thước thành công');
        }
        res.redirect('/admin/size');
    });
}

module.exports = {
    pageSize,
    create,
    update,
    remove
}