const connection = require("../database/database.js")

const readUser = (req, res) =>{
    const {id} = req.body;
    const query = "SELECT * FROM NguoiDung WHERE id = ?";
    connection.con.query(query, [id], (err, result) =>{
        if (err) {
            connection.con.rollback(() => {
                res.json({ status: "ERROR", error: err });
            });
        } else {
            connection.con.commit((err) => {
                if (err) {
                    res.json({ status: "ERROR", error: err });
                } else {
                    res.json({ status: "SUCCESS", user: result });
                }
            });
        }
    });
}

const updateUser = (req, res) => {
    const { id, image, fullname } = req.body;
    const query = "UPDATE NguoiDung SET ho_va_ten = ?, anh_dai_dien = ? WHERE id = ?";
                    connection.con.query(query, [fullname, image, id], (err, updateResult) => {
                        if (err) {
                            connection.con.rollback(() => {
                                res.json({ status: "ERROR", error: err });
                            });
                        } else {
                            connection.con.commit((err) => {
                                if (err) {
                                    res.json({ status: "ERROR", error: err });
                                } else {
                                    res.json({ status: "SUCCESS" });
                                }
                            });
                        }
                    });
                }

module.exports = {
    readUser,
    updateUser
};