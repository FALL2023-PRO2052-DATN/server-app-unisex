const connection = require("../database/database.js")

const readCart = (req, res) => {
    const query = "SELECT SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.giam_gia, " +
        "GioHang.so_luong, GioHang.don_gia, GioHang.kich_thuoc " +
        "FROM GioHang " +
        "INNER JOIN SanPham ON GioHang.san_pham_id = SanPham.id " +
        "WHERE GioHang.hienThi = 1"

    connection.con.query(query, (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            if (results.length > 0) {
                res.json({ status: "SUCCESS", cartList: results })
            } else {
                res.json({ status: "NOT FOUND" })
            }
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

module.exports = {
    readCart,
    insertCart
}
