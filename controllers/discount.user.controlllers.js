const connection = require("../database/database.js")

const readDiscountById = (req, res) => {

    const { code } = req.body

    const query = "SELECT * FROM GiamGia WHERE hienThi = 1 AND code = ? "
    connection.con.query(query, [code], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", discount: results[0] })
        }
    })
}



module.exports = {
    readDiscountById,
}
