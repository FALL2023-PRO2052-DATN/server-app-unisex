const database = require("../../database/database.js")

const readNotification = async (userId) => {
    const query = "SELECT * FROM ThongBao WHERE hienThi = 1 AND nguoi_dung_id = ?"
    return await database.queryDatabase(query, [userId])
}

const insertNotification = async (content, image, title, userId) => {
    const query = "INSERT INTO ThongBao(noi_dung, hinh_anh, tieu_de, nguoi_dung_id) VALUES (?, ?, ?, ?)"
    return await database.queryDatabase(query, [content, image, title, userId])
}

const deleteNotification = async (id) => {
    const query = "DELETE FROM ThongBao WHERE id = ?"
    return await database.queryDatabase(query, [id])
}

module.exports = {
    readNotification,
    insertNotification,
    deleteNotification
}