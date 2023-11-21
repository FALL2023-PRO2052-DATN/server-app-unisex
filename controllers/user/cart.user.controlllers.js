const connection = require("../../database/database.js")

const readCartById = (req, res) => {
    const { id } = req.body
    const query = "SELECT GioHang.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.giam_gia, " +
        "GioHang.so_luong, GioHang.don_gia, GioHang.kich_thuoc, GioHang.san_pham_id " +
        "FROM GioHang " +
        "INNER JOIN SanPham ON GioHang.san_pham_id = SanPham.id " +
        "WHERE GioHang.hienThi = 1 AND GioHang.nguoi_dung_id = ?"

    connection.con.query(query, [id], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", cartList: results })
        }
    })
}

const readCart = (req, res) => {

    const query = "SELECT GioHang.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.giam_gia, " +
        "GioHang.so_luong, GioHang.don_gia, GioHang.kich_thuoc, GioHang.san_pham_id " +
        "FROM GioHang " +
        "INNER JOIN SanPham ON GioHang.san_pham_id = SanPham.id " +
        "WHERE GioHang.hienThi = 1"

    connection.con.query(query, (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", cartList: results })
        }
    })
}

const insertCart = (req, res) => {

    const { quantity, price, size, userId, productId } = req.body

    const query = "INSERT INTO GioHang(so_luong, don_gia, kich_thuoc, nguoi_dung_id, san_pham_id) VALUE(? , ?, ?, ?, ?)"

    connection.con.query(query, [quantity, price, size, userId, productId], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS" })
        }
    })
}

const deleteCart = (req, res) => {

    const { id, userId } = req.body

    const query = "DELETE FROM GioHang WHERE id = ?"

    connection.con.query(query, [id, userId], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS" })
        }
    })
}


const updateCart = (req, res) => {

    const { id, quantity } = req.body
    const query = "UPDATE GioHang SET so_luong = ? WHERE id = ?"

    connection.con.query(query, [quantity, id], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS" })
        }
    })
}


module.exports = {
    readCart,
    insertCart,
    readCartById,
    deleteCart,
    updateCart
}
