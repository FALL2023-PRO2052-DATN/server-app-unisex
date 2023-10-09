const database = require('../database/database.js');

// Lấy danh sách danh mục sản phẩm
const pageCategory = (req, res) => {
    const query = `SELECT
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

    database.con.query(query, function (err, categorys, fields) {
        if (err) {
            return console.log(err);
        };
        res.render('category', { categorys });
    });
}

// Thêm danh mục sản phẩm
const create = (req, res) => {
    const { ten_danh_muc } = req.body;
    const query = `INSERT INTO DanhMuc (ten_danh_muc) VALUES (?)`;

    database.con.query(query, [ten_danh_muc], function (err, result) {
        if (err) {
            req.flash('error', 'Thêm danh mục không thành công. Vui lòng thử lại!');
        } else {
            req.flash('success', 'Thêm danh mục thành công');
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
            req.flash('error', 'Cập danh mục không thành công. Vui lòng thử lại !')
        } else {
            req.flash('success', 'Cập nhật danh mục thành công')
        }
        res.redirect('/admin/category');
    });
}

// Xoá danh mục sản phẩm
const remove = (req, res) => {
    const { id_danh_muc } = req.body;

    // Kiểm tra có sản phẩm nào thuộc danh mục 
    const checkQuery = 'SELECT * FROM SanPham WHERE danh_muc_id = ? AND hienThi = 1';

    database.con.query(checkQuery, [id_danh_muc], (err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (products.length === 0) {
            // Xoá danh mục -> update hienThi = 0
            const updateQuery = 'UPDATE DanhMuc SET hienThi = 0 WHERE id = ?';

            database.con.query(updateQuery, [id_danh_muc], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }

                if (result.affectedRows === 0) {
                    req.flash('error', 'Xoá danh mục không thành công. Vui lòng thử lại!');
                } else {
                    req.flash('success', 'Xoá danh mục thành công');
                }
                res.redirect('/admin/category');
            });
        } else {
            req.flash('warning', 'Không thể xoá danh mục. Đã có sản phẩm thuộc danh mục này!');
            res.redirect('/admin/category');
        }
    });
};

module.exports = {
    pageCategory,
    create,
    update,
    remove
}