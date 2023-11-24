const database = require("../../database/database.js")

// lấy tất cả giảm giá theo hiển thị = 1
const readDiscount = async () => {

    const query = "SELECT * FROM GiamGia WHERE hienThi = 1"
    return await database.queryDatabase(query, [])

}

// lấy giảm giá theo code và hiển thị = 1
const readDiscountById = async (code) => {

    const query = "SELECT * FROM GiamGia WHERE hienThi = 1 AND code = ? "
    return await database.queryDatabase(query, [code])

}

module.exports = {
    readDiscount,
    readDiscountById
}