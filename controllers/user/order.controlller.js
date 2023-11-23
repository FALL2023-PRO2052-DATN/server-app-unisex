const model = require('../../models/user/order.model')

const insertDonHang = async (req, res) => {

    try {
        const { id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang, ly_do_huy, thanh_tien,
            giam_gia_id, dia_chi_id, trang_thai_thanh_toan, so_luong_don_hang } = req.body;

        const results = await model.insertDonHang(id, ghi_chu, hinh_thuc_thanh_toan, tinh_trang_giao_hang,
            ly_do_huy, thanh_tien, giam_gia_id, dia_chi_id, trang_thai_thanh_toan, so_luong_don_hang)

        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}


const insertDonHangDetail = async (req, res) => {

    try {
        const { kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id } = req.body;
        const results = await model.insertDonHangDetail(kich_thuoc, so_luong, don_gia, don_hang_id, san_pham_id)
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error });
    }

}



module.exports = {
    insertDonHang,
    insertDonHangDetail
}
