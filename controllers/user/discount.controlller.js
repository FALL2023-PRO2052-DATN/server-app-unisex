const model = require("../../models/user/discount.model.js")

const readDiscountById = async (req, res) => {

    try {
        const { code } = req.body
        const results = await model.readDiscountById(code)
        res.json({ status: "SUCCESS", discount: results[0] })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

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
