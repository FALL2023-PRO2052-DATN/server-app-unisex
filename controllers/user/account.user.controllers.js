const connection = require("../../database/database.js")

const insertUser = (req, res) => {
  const { id } = req.body
  // tìm kiếm
  const select = "SELECT * FROM NguoiDung WHERE id = ?";
  // thêm
  const insert = "INSERT INTO NguoiDung(id) VALUE (?)";

  connection.con.beginTransaction((err) => {

    if (err) {
      res.json({ status: "ERROR", err });
      return;
    }

    connection.con.query(select, [id], (err, results) => {
      if (err) {
        connection.con.rollback(() => {
          res.json({ status: "ERROR", err });
        });
      } else {
        if (results.length == 0) {
          connection.con.query(insert, [id], (err, insertResults) => {
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
          connection.con.rollback(() => {
            res.json({ status: "DUPLICATE" });
          });
        }
      }
    });
  });
}

module.exports = {
  insertUser
}
