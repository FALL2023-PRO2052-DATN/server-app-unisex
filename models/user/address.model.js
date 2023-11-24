const connection = require("../../database/database.js")

// lấy địa chỉ mặc định theo id người dùng
const readAddress = async (userId) => {

    const query = "SELECT * FROM DiaChi WHERE mac_dinh = 1 AND hienThi = 1 AND nguoi_dung_id = ? "
    return await connection.queryDatabase(query, [userId])

}

// lấy danh sách địa chỉ theo id người dùng
const getListAddress = async (userId) => {

    const query = "SELECT * FROM DiaChi WHERE hienThi = 1  AND nguoi_dung_id = ?"
    return await connection.queryDatabase(query, [userId])

}

// thêm mới đại chỉ
const insertAddress = async (id, fullname, email, phone, address, defaultStatus, userId) => {

    const queryInsert = "INSERT INTO DiaChi(ho_va_ten, email, dien_thoai, dia_chi, mac_dinh, nguoi_dung_id) VALUE (?,?,?,?,?,?)";
    const queryUpdate = "UPDATE DiaChi SET mac_dinh = 0 WHERE id = ?";

    try {
        // Bắt đầu giao dịch
        await connection.queryDatabase("START TRANSACTION");

        // Thực hiện truy vấn chèn địa chỉ mới
        await connection.queryDatabase(queryInsert, [fullname, email, phone, address, defaultStatus, userId]);

        // nếu địa chỉ được thêm vào là mặc định, thì cập nhật lại đại chỉ mặc định hiện tại thành không mặc định -> chỉ để 1 địa chỉ mặc định
        if (defaultStatus == 1) {
            await connection.queryDatabase(queryUpdate, [id]);
        }

        // Commit giao dịch nếu mọi thứ thành công
        await connection.queryDatabase("COMMIT");

        // Trả về kết quả thành công
        return { status: "SUCCESS" };

    } catch (err) {

        // Rollback giao dịch nếu có lỗi
        await connection.queryDatabase("ROLLBACK");

        // Trả về kết quả lỗi và thông điệp lỗi
        return { status: "ERROR", err: err.sqlMessage || err };
    }

};

// cập nhật địa chỉ
const updateAddress = async (fullname, email, phone, address, defaultStatus, id, idDefault) => {
    // cập nhật địa chỉ theo id
    const queryUpdateBefore = "UPDATE DiaChi SET ho_va_ten = ?, email = ?, dien_thoai = ?, dia_chi = ?, mac_dinh = ? WHERE id = ? "
    // cập nhật mặc định theo idDefault
    const queryUpdateLater = "UPDATE DiaChi SET mac_dinh = 0 WHERE id = ?"

    try {
        // Bắt đầu giao dịch
        await connection.queryDatabase("START TRANSACTION");

        // Thực hiện truy vấn chèn địa chỉ mới
        await connection.queryDatabase(queryUpdateBefore, [fullname, email, phone, address, defaultStatus, id]);

        // nếu địa chỉ được thêm vào là mặc định , id địa chỉ hiện tại và địa chỉ được thêm vào không trùng -> cập nhật địa chỉ hiện tại(idDefault)
        if (defaultStatus == 1 && idDefault != id) {
            await connection.queryDatabase(queryUpdateLater, [idDefault]);
        }

        // Commit giao dịch nếu mọi thứ thành công
        await connection.queryDatabase("COMMIT");

        // Trả về kết quả thành công
        return { status: "SUCCESS" };

    } catch (err) {

        // Rollback giao dịch nếu có lỗi
        await connection.queryDatabase("ROLLBACK");

        // Trả về kết quả lỗi và thông điệp lỗi
        return { status: "ERROR", err: err.sqlMessage || err };
    }

}


// xóa địa chỉ theo id -> cập nhật lại hiển thị = 0
const deleteAddress = async (id) => {

    const query = "UPDATE DiaChi SET hienThi = 0 WHERE id = ?"
    return await connection.queryDatabase(query, [id])
}



module.exports = {
    readAddress,
    getListAddress,
    insertAddress,
    updateAddress,
    deleteAddress
}
