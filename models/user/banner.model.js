const connection = require("../../database/database.js")

// lấy danh sách banner với hiển thị = 1
const readBanner = async () => {

    const query = 'SELECT * FROM Banner WHERE hienThi = 1'
    return await connection.queryDatabase(query, [])

}


module.exports = {
    readBanner
}