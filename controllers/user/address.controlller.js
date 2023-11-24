const model = require('../../models/user/address.model')
const connection = require("../../database/database.js")

const readAddress = async (req, res) => {

    try {
        const { userId } = req.body
        const results = await model.readAddress(userId)
        res.json({ status: "SUCCESS", diaChi: results[0] })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const getListAddress = async (req, res) => {

    try {
        const { userId } = req.body
        const results = await model.getListAddress(userId)
        res.json({ status: "SUCCESS", diaChiList: results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const insertAddress = async (req, res) => {


    try {
        const { id, fullname, email, phone, address, defaultStatus, userId } = req.body;
        const results = await model.insertAddress(id, fullname, email, phone, address, defaultStatus, userId)
        res.json(results)
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const updateAddress = async (req, res) => {

    try {
        const { fullname, email, phone, address, defaultStatus, id, idDefault } = req.body;
        const results = await model.updateAddress(fullname, email, phone, address, defaultStatus, id, idDefault)
        res.json(results)
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

const deleteAddress = async (req, res) => {

    try {
        const { id } = req.body
        const results = await model.deleteAddress(id)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}



module.exports = {
    readAddress,
    getListAddress,
    insertAddress,
    updateAddress,
    deleteAddress
}
