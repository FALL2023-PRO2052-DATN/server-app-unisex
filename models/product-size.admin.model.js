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

const getAllByProductId = async (idProduct) => {
    const query = `SELECT
                        KTSP.id,
                        SP.anh_dai_dien,
                        SP.ten_san_pham,
                        KTSP.kich_thuoc_id,
                        KT.ten_kich_thuoc,
                        KTSP.so_luong_ton_kho
                    FROM
                        shop_clothes.SanPham SP
                    INNER JOIN
                        shop_clothes.KichThuoc_SanPham KTSP ON SP.id = KTSP.san_pham_id
                    INNER JOIN
                        shop_clothes.KichThuoc KT ON KTSP.kich_thuoc_id = KT.id
                    WHERE KTSP.hienThi = 1 AND SP.id = ?`;
    return await database.queryDatabase(query, [idProduct]);
}

const getAllBySizeId = async (id) => {
    const query = `SELECT * FROM KichThuoc_SanPham WHERE kich_thuoc_id =? AND hienThi = 1`
    return await database.queryDatabase(query, [id]);
}

const insert = async (data) => {
    const values = [
        data.size,
        data.idProduct,
        data.quantity
    ];
    const query = `INSERT INTO KichThuoc_SanPham (kich_thuoc_id, san_pham_id, so_luong_ton_kho) VALUES (?, ?, ?)`
    return await database.queryDatabase(query, values);
}

const update = async (data) => {
    const values = [
        data.size,
        data.idProduct,
        data.quantity,
        data.idProductSize
    ];
    const query = `UPDATE KichThuoc_SanPham SET kich_thuoc_id =?, san_pham_id=?, so_luong_ton_kho=? WHERE id=?`;
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

const removeById = async (id) => {
    const query = `DELETE FROM KichThuoc_SanPham WHERE id = ?`;
    return await database.queryDatabase(query, [id]);
}

const removeByProductId = async (idProduct) => {
    const query = `DELETE FROM KichThuoc_SanPham WHERE san_pham_id = ?`;
    return await database.queryDatabase(query, [idProduct]);
}

module.exports = {
    getAll,
    getAllByProductId,
    getAllBySizeId,
    insert,
    update,
    updateQuatity,
    removeById,
    removeByProductId,
}