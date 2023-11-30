const model = require("../../models/user/comment.model")

const readCommentByIdProduct = async (req, res) => {

  try {
    const { id } = req.body
    const results = await model.readCommentByIdProduct(id)
    res.json({ status: "SUCCESS", commentList: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}


const insertComment = async (req, res) => {

  try {
    const { pointComment, content, idUser, idProduct } = req.body
    const results = await model.insertComment(pointComment, content, idUser, idProduct)
    res.json({ status: "SUCCESS", results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}


const readCommentByStar = async (req, res) => {

  try {
    const { id, star } = req.body
    const results = await model.readCommentByIdStar(id, star)
    res.json({ status: "SUCCESS", commentList: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}

module.exports = {
  readCommentByIdProduct,
  insertComment,
  readCommentByStar
}
