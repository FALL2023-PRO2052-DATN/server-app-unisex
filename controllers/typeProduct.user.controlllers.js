const connection = require("../database/database.js")

const readTypeProduct = (req, res) => {
    const query = "SELECT * FROM DanhMuc WHERE hienThi = 1"

    connection.con.query(query, (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            if (results.length > 0) {
                res.json({ status: "SUCCESS", loaiSanPham: results })
            } else {
                res.json({ status: "NOT FOUND" })
            }
        }
    })
}

module.exports = {
    readTypeProduct
}
