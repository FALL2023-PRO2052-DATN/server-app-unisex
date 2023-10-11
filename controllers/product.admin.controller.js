const multer = require('multer');
const database = require('../database/database.js');
const cloudinary = require('../cloud/cloudinary.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Danh sách sản phẩm
const pageProduct = async (req, res) => {
    try {
        const data = await getProducts();
        res.render('product', { data });
    } catch (error) {
        console.log(error);
    }
}

// Lấy danh sách sản phẩm
const getProducts = () => {
    return new Promise((resolve, reject) => {
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
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Trang thêm sản phẩm
const pageAddProduct = async (req, res) => {
    try {
        const sizes = await getSizes();
        const categoris = await getCategoris();
        res.render('add-product', { sizes, categoris });
    } catch (error) {
        console.log(error);
    }
}

// Lấy danh sách kích thước
const getSizes = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM KichThuoc WHERE hienThi = 1`;
        database.con.query(query, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

// Lấy danh sách danh mục
const getCategoris = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM DanhMuc WHERE hienThi = 1`;
        database.con.query(query, function (err, result, fields) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

// Thêm sản phẩm 
const create = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return console.error(err);

        }

        if (!req.file) {
            return;
        }

        const imageBuffer = req.file.buffer;
        cloudinary.uploadImageToCloudinary(imageBuffer, (err, imageUrl) => {
            if (err) {
                return res.status(500).send('Tải hình banner không thành công' + err);
            }

            const {
                ten_san_pham,
                gia_ban,
                giam_gia,
                mo_ta_chi_tiet,
                noi_bat, moi_nhat,
                so_luong,
                danh_muc_id,
                countries
            } = req.body;

            const values = [
                ten_san_pham,
                imageUrl,
                gia_ban,
                giam_gia,
                noi_bat,
                moi_nhat,
                mo_ta_chi_tiet,
                danh_muc_id
            ]

            const query = `INSERT INTO SanPham (ten_san_pham, anh_dai_dien, gia_ban, giam_gia, noi_bat, moi_nhat, mo_ta_chi_tiet, danh_muc_id) VALUES (? , ?, ?, ?, ? , ?, ?, ?);                `
            database.con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    // Thêm sản phẩm thành công thì sẽ tiến hành thêm kích thước sản phẩm để quản lý tồn kho
                    const sizes = countries || [0];
                    const id_san_pham = result.insertId;

                    sizes.forEach((size) => {
                        const sizeValues = [size, id_san_pham, so_luong];
                        const sizeQuery = `INSERT INTO KichThuoc_SanPham (kich_thuoc_id, san_pham_id, so_luong_ton_kho) VALUES (?, ?, ?)`;
                        database.con.query(sizeQuery, sizeValues, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });

                    req.flash('success', 'Thêm sản phẩm thành công');
                    res.redirect('/admin/product/add');
                }
            });
        })

    });
}

// Xoá sản phẩm
const remove = (req, res) => {
    const { id_san_pham } = req.body;
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
            });
            req.flash('success', 'Xoá sản phẩm thành công');
            res.redirect('/admin/product');
        }
    });
}

module.exports = {
    pageProduct,
    pageAddProduct,
    create,
    remove
}