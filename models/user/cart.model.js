const connection = require("../../database/database.js")

// lấy danh sách giỏ hàng theo id người dùng và hiển thi = 1
const readCartById = async (id) => {

    const query = "SELECT GioHang.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.giam_gia, " +
        "GioHang.so_luong, GioHang.don_gia, GioHang.kich_thuoc, GioHang.san_pham_id " +
        "FROM GioHang " +
        "INNER JOIN SanPham ON GioHang.san_pham_id = SanPham.id " +
        "WHERE GioHang.hienThi = 1 AND GioHang.nguoi_dung_id = ?"

    return await connection.queryDatabase(query, [id])

}

// thêm vào giỏ hàng
const insertCart = async (quantity, price, size, userId, productId) => {

    const query = "INSERT INTO GioHang(so_luong, don_gia, kich_thuoc, nguoi_dung_id, san_pham_id) VALUE(? , ?, ?, ?, ?)"

    return await connection.queryDatabase(query, [quantity, price, size, userId, productId])

}

// xóa khỏi giỏ hàng theo id giỏ hàng
const deleteCart = async (id) => {

    const query = "DELETE FROM GioHang WHERE id = ?"

    return await connection.queryDatabase(query, [id])

}

// cập nhật số lượng sản phẩm theo id giỏ hàng
const updateCart = async (id, quantity) => {

    const query = "UPDATE GioHang SET so_luong = ? WHERE id = ?"

    return await connection.queryDatabase(query, [quantity, id])

}


module.exports = {
    insertCart,
    readCartById,
    deleteCart,
    updateCart
}
