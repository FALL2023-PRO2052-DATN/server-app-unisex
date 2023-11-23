const connection = require("../../database/database.js")

// lất danh sách danh mục sản phẩm
const readTypeProduct = async () => {

    const query = "SELECT * FROM DanhMuc WHERE hienThi = 1"

    return await connection.queryDatabase(query, [])

}

module.exports = {
    readTypeProduct
}
