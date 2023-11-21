const database = require("../../database/database.js")

const readDiscount = async () => {
    const query = "SELECT * FROM GiamGia WHERE hienThi = 1"
    return database.queryDatabase(query, [])
}

module.exports = {
    readDiscount
}