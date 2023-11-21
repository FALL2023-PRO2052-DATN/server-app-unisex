const model = require('../../models/user/notification.model')

const readNotification = async (req, res) => {
    try {
        const { userId } = req.body
        const results = await model.readNotification(userId)
        res.json({ status: "SUCCESS", notificationList: results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }
}

const insertNotification = async (req, res) => {
    try {
        const { content, image, title, userId } = req.body
        const results = await model.insertNotification(content, image, title, userId)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }
}

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.body
        const results = await model.deleteNotification(id)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }
}

module.exports = {
    readNotification,
    insertNotification,
    deleteNotification
}