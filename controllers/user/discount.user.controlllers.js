const connection = require("../../database/database.js")
const model = require("../../models/user/discount.model.js")

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


const readDiscount = async (req, res) => {
    try {
        const results = await model.readDiscount()
        res.json({ status: "SUCCESS", discountList: results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }
}


module.exports = {
    readDiscountById,
    readDiscount
}
