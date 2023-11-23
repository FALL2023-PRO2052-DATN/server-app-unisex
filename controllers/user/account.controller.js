const model = require('../../models/user/account.model')


const insertUser = async (req, res) => {

  try {
    const { id } = req.body
    const results = await model.insertUser(id)
    res.json({ status: "SUCCESS", results })
  } catch (error) {
    res.json({ status: "ERROR", error });
  }

}

module.exports = {
  insertUser
}
