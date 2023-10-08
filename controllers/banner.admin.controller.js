const multer = require('multer');
const database = require('../database/database.js');

// Upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Danh sách banner
const pageBanner = (req, res) => {
    const query = `SELECT * FROM Banner WHERE hienThi = 1`;

    database.con.query(query, function (err, data, fields) {
        if (err) {
            return console.log(err);
        };
        res.render('banner', { data });
    });
}

// Thêm banner 
const create = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error(err);
        } else {
            if (!req.file) {
                req.flash('error', 'Vui lòng chọn ảnh khi banner');
                return res.redirect('/admin/banner');
            }

            const anh_banner = `/uploads/` + req.file.filename;
            const query = `INSERT INTO Banner (anh_banner) VALUES (?)`;
            database.con.query(query, [anh_banner], function (err, result) {
                if (err) {
                    req.flash('error', 'Thêm banner không thành công!')
                } else {
                    req.flash('success', 'Thêm banner thành công')
                }
                res.redirect('/admin/banner');
            });
        }
    });
}

// Xoá banner
const remove = (req, res) => {
    const { id_banner } = req.body;
    const query = `UPDATE Banner SET hienThi = 0 WHERE id=?`;

    database.con.query(query, [id_banner], function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result.affectedRows === 0) {
            req.flash('error', 'Xoá banner không thành công. Vui lòng thử lại!')
        } else {
            req.flash('success', 'Xoá banner thành công');
        }
        res.redirect('/admin/banner');
    });
}

module.exports = {
    pageBaner: pageBanner,
    create,
    remove
}