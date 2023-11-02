const e = require("express")
const connection = require("../database/database.js")

const readAddress = (req, res) => {

    const { userId } = req.body

    const query = "SELECT * FROM DiaChi WHERE mac_dinh = 1 AND hienThi = 1 AND nguoi_dung_id = ? "
    connection.con.query(query, [userId], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", diaChi: results[0] })
        }
    })
}

const getListAddress = (req, res) => {
    const { userId } = req.body

    const query = "SELECT * FROM DiaChi WHERE hienThi = 1  AND nguoi_dung_id = ?"
    connection.con.query(query, [userId], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", diaChiList: results })
        }
    })
}

const insertAddress = (req, res) => {
    const { id, fullname, email, phone, address, defaultStatus, userId } = req.body;
    const queryInsert = "INSERT INTO DiaChi(ho_va_ten, email, dien_thoai, dia_chi, mac_dinh, nguoi_dung_id) VALUE (?,?,?,?,?,?)"
    const queryUpdate = "UPDATE DiaChi SET mac_dinh = 0 WHERE id = ?"
    connection.con.beginTransaction((err) => {
        if (err) {
            res.json({ status: "ERROR", err });
            return;
        }
    })

    connection.con.query(queryInsert, [fullname, email, phone, address, defaultStatus, userId], (err, results) => {
        if (err) {
            connection.con.rollback(() => {
                res.json({ status: "ERROR", err });
            });
        } else {
            if (defaultStatus == 1) {
                connection.con.query(queryUpdate, [id], (err, insertResults) => {
                    if (err) {
                        connection.con.rollback(() => {
                            res.json({ status: "ERROR", err });
                        });
                    } else {
                        connection.con.commit((err) => {
                            if (err) {
                                res.json(err)
                            } else {
                                res.json({ status: "SUCCESS" })
                            }
                        });
                    }
                });
            } else {
                connection.con.commit((err) => {
                    if (err) {
                        connection.con.rollback(() => {
                            res.json({ status: "ERROR", err: err.sqlMessage });
                        });
                    } else {
                        res.json({ status: "SUCCESS" });
                    }
                });
            }
        }
    });
}

const updateAddress = (req, res) => {
    const { fullname, email, phone, address, defaultStatus, id, idDefault } = req.body;
    
    const queryUpdateBefore = "UPDATE DiaChi SET ho_va_ten = ?, email = ?, dien_thoai = ?, dia_chi = ?, mac_dinh = ? WHERE id = ? "
    const queryUpdateLater = "UPDATE DiaChi SET mac_dinh = 0 WHERE id = ?"
    connection.con.beginTransaction((err) => {
        if (err) {
            res.json({ status: "ERROR", err });
            return;
        }
    })

    connection.con.query(queryUpdateBefore, [fullname, email, phone, address, defaultStatus, id], (err, results) => {
        if (err) {
            connection.con.rollback(() => {
                res.json({ status: "ERROR", err });
            });
        } else {
            if (defaultStatus == 1 && idDefault != id) {
                connection.con.query(queryUpdateLater, [idDefault], (err, updateResults) => {
                    if (err) {
                        connection.con.rollback(() => {
                            res.json({ status: "ERROR", err });
                        });
                    } else {
                        connection.con.commit((err) => {
                            if (err) {
                                res.json(err)
                            } else {
                                res.json({ status: "SUCCESS" })
                            }
                        });
                    }
                });
            } else {
                connection.con.commit((err) => {
                    if (err) {
                        connection.con.rollback(() => {
                            res.json({ status: "ERROR", err: err.sqlMessage });
                        });
                    } else {
                        res.json({ status: "SUCCESS" });
                    }
                });
            }
        }
    });
}

const deleteAddress = (req, res) => {
    const { id } = req.body
    const query = "UPDATE DiaChi SET hienThi = 0 WHERE id = ?"
    connection.con.query(query, [id], (err, results) => {
        if (err) {
            res.json({ status: "ERROR", err })
        } else {
            res.json({ status: "SUCCESS", addressList: results })
        }
    })
}



module.exports = {
    readAddress,
    getListAddress,
    insertAddress,
    updateAddress,
    deleteAddress
}
