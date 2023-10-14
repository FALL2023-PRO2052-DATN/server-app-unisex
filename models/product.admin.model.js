const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT
                    SP.id AS san_pham_id,
                    SP.anh_dai_dien AS hinh_anh,
                    SP.ten_san_pham,
                    SP.gia_ban,
                    SP.giam_gia,
                    SP.noi_bat,
                    SP.moi_nhat,
                    SP.mo_ta_chi_tiet,
                    DM.ten_danh_muc,
                    GROUP_CONCAT(KT.ten_kich_thuoc SEPARATOR ', ') AS kich_thuoc
                    FROM SanPham SP
                    INNER JOIN DanhMuc DM ON SP.danh_muc_id = DM.id
                    LEFT JOIN KichThuoc_SanPham KTS ON SP.id = KTS.san_pham_id AND KTS.hienThi = 1
                    LEFT JOIN KichThuoc KT ON KTS.kich_thuoc_id = KT.id
                    WHERE SP.hienThi = 1
                    GROUP BY SP.id`;
    return await database.queryDatabase(query, []);
}

const insert = async (data) => {
    const query = `INSERT INTO SanPham (ten_san_pham, anh_dai_dien, gia_ban, giam_gia, noi_bat, moi_nhat, mo_ta_chi_tiet, danh_muc_id) VALUES (? , ?, ?, ?, ? , ?, ?, ?);`
    const values = [
        data.ten_san_pham,
        data.imageUrl,
        data.gia_ban,
        data.giam_gia,
        data.noi_bat,
        data.moi_nhat,
        data.mo_ta_chi_tiet,
        data.danh_muc_id
    ]
    return await database.queryDatabase(query, values);
}

const update = async () => {

}

const remove = async (idProduct) => {
    const query = `UPDATE SanPham SET hienThi = 0 WHERE id=?`;
    return await database.queryDatabase(query, [idProduct]);
}

module.exports = {
    getAll,
    insert,
    update,
    remove
}