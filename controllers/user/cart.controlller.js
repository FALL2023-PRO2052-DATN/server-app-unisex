const model = require("../../models/user/cart.model")

const readCartById = async (req, res) => {

    try {
        const { id } = req.body
        const results = await model.readCartById(id)
        res.json({ status: "SUCCESS", cartList: results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const insertCart = async (req, res) => {

    try {
        const { quantity, price, size, userId, productId } = req.body
        const results = await model.insertCart(quantity, price, size, userId, productId)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}


const deleteCart = async (req, res) => {

    try {
        const { id } = req.body
        const results = await model.deleteCart(id)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}


const updateCart = async (req, res) => {

    try {
        const { id, quantity } = req.body
        const results = await model.updateCart(id, quantity)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}


module.exports = {
    insertCart,
    readCartById,
    deleteCart,
    updateCart
}
