const connection = require("../database/database.js")


const readBanner = (req, res) => {
    const query = 'SELECT * FROM Banner WHERE hienThi = 1'

    connection.con.query(query, (err, results) => {
        if (err) {
            res.json({ status: "ERROR" })
        } else {
            if (results.length > 0) {
                res.json({ status: "SUCCESS", results })
            } else {
                res.json({ status: "NOT FOUND" })
            }
        }
    })
}


module.exports = {
    readBanner
}