const connection = require("../../database/database.js")

// lấy danh sách giỏ hàng theo id người dùng và hiển thi = 1
const readCartById = async (id) => {

    const query = "SELECT GioHang.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.giam_gia, " +
        "GioHang.so_luong, GioHang.don_gia, GioHang.kich_thuoc, GioHang.san_pham_id, KichThuoc_SanPham.so_luong_ton_kho " +
        "FROM GioHang " +
        "INNER JOIN SanPham ON GioHang.san_pham_id = SanPham.id " +
        "INNER JOIN KichThuoc_SanPham ON SanPham.id = KichThuoc_SanPham.san_pham_id " +
        "INNER JOIN KichThuoc kt ON KichThuoc_SanPham.kich_thuoc_id = kt.id " +
        "WHERE GioHang.hienThi = 1 AND GioHang.nguoi_dung_id = ? AND kt.ten_kich_thuoc = GioHang.kich_thuoc"

    return await connection.queryDatabase(query, [id])

}

// thêm vào giỏ hàng
const insertCart = async (quantity, price, size, userId, productId) => {

    const querySelect = "SELECT * FROM GioHang " +
        "WHERE hienThi = 1 AND nguoi_dung_id = ? AND san_pham_id = ? AND kich_thuoc = ?"

    const queryInsert = "INSERT INTO GioHang(so_luong, don_gia, kich_thuoc, nguoi_dung_id, san_pham_id) VALUE(? , ?, ?, ?, ?)"

    try {
        // Bắt đầu giao dịch
        await connection.queryDatabase("START TRANSACTION");

        // Thực hiện truy vấn 
        const results = await connection.queryDatabase(querySelect, [userId, productId, size]);

        if (results.length > 0) {
            await connection.queryDatabase("ROLLBACK");
            return { status: "DUPLICATE" };
        } else {
            await connection.queryDatabase(queryInsert, [quantity, price, size, userId, productId]);
            await connection.queryDatabase("COMMIT");
            return { status: "SUCCESS" };
        }

    } catch (error) {
        // Rollback giao dịch nếu có lỗi
        await connection.queryDatabase("ROLLBACK");
        // Trả về kết quả lỗi và thông điệp lỗi
        return { status: "ERROR", err: err.sqlMessage || err };
    }

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
