const connection = require("../database/database.js")

const readAddress = (req, res) => {

    const { userId } = req.body

    const query = "SELECT * FROM DiaChi WHERE mac_dinh = 1 AND hienThi = 1 AND nguoi_dung_id = ? "
    connection.con.query(query, [userId], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", diaChi: results[0] })
        }
    })
}



module.exports = {
    readAddress,
}
