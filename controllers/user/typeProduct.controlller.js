const model = require('../../models/user/typeProduct.model')

const readTypeProduct = async (req, res) => {

    try {
        const results = await model.readTypeProduct()
        res.json({ status: "SUCCESS", loaiSanPham: results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

module.exports = {
    readTypeProduct
}
