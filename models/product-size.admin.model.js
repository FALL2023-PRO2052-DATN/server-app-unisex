const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT
                        KTSP.id,
                        SP.anh_dai_dien,
                        SP.ten_san_pham,
                        KT.ten_kich_thuoc,
                        KTSP.so_luong_ton_kho
                    FROM
                        shop_clothes.SanPham SP
                    INNER JOIN
                        shop_clothes.KichThuoc_SanPham KTSP ON SP.id = KTSP.san_pham_id
                    INNER JOIN
                        shop_clothes.KichThuoc KT ON KTSP.kich_thuoc_id = KT.id
                    WHERE KTSP.hienThi = 1`;
    return await database.queryDatabase(query, []);
}

const insert = async (data) => {
    const values = [
        data.size,
        data.id_san_pham,
        data.so_luong
    ];
    const query = `INSERT INTO KichThuoc_SanPham (kich_thuoc_id, san_pham_id, so_luong_ton_kho) VALUES (?, ?, ?)`
    return await database.queryDatabase(query, values);
}

const updateQuatity = async (id, quantity) => {
    const values = [
        quantity,
        id
    ];
    const query = `UPDATE KichThuoc_SanPham SET so_luong_ton_kho=? WHERE id=?`;
    return await database.queryDatabase(query, values);
}

const removeByIdProduct = async (idProduct) => {
    const query = `UPDATE KichThuoc_SanPham SET hienThi = 0 WHERE san_pham_id=?`;
    return await database.queryDatabase(query, [idProduct]);
}

const removeById = async (id) => {
    const query = `UPDATE KichThuoc_SanPham SET hienThi = 0 WHERE id=?`;
    return await database.queryDatabase(query, [id]);
}

const getAllBySizeId = async (id) => {
    const query = `SELECT * FROM KichThuoc_SanPham WHERE kich_thuoc_id =? AND hienThi = 1`
    return await database.queryDatabase(query, [id]);
}

module.exports = {
    getAll,
    insert,
    updateQuatity,
    removeById,
    removeByIdProduct,
    getAllBySizeId
}