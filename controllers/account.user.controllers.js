const connection = require("../database/database.js")

const insertUser = (req, res) => {
    const { id } = req.body
    const query = "INSERT INTO NguoiDung(id) VALUE (?)"
    connection.con.query(query,
        [id],
        (err) => {
            if (err) {
                res.json(err)
            } else {
                res.json({ status: "SUCCESS" })
            }
        })
}

module.exports = {
    insertUser
}
