const model = require('../../models/user/product.model')

const readProductNew = async (req, res) => {

  try {
    const results = await model.readProductNew()
    res.json({ status: "SUCCESS", sanPham: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}

const readProductOutsanding = async (req, res) => {

  try {
    const results = await model.readProductOutsanding()
    res.json({ status: "SUCCESS", sanPham: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}

const readProductAll = async (req, res) => {

  try {
    const results = await model.readProductAll()
    res.json({ status: "SUCCESS", sanPham: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}

const readProductByIdDanhMuc = async (req, res) => {

  try {
    const { id } = req.body
    const results = await model.readProductByIdDanhMuc(id)
    res.json({ status: "SUCCESS", sanPham: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}

const readProductByIdProduct = async (req, res) => {

  try {
    const { id } = req.body
    const results = await model.readProductByIdProduct(id)
    res.json({ status: "SUCCESS", sanPham: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}


const readSize_ProductByIdProduct = async (req, res) => {

  try {
    const { id } = req.body
    const results = await model.readSize_ProductByIdProduct(id)
    res.json({ status: "SUCCESS", sizeProduct: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}

const readProductByListId = async (req, res) => {

  try {
    const { idUser, idList } = req.body

    const listCart = JSON.parse(idList)

    const results = await model.readProductByListId(idUser, listCart)
    res.json({ status: "SUCCESS", cartList: results })
  } catch (error) {
    res.json({ status: "ERROR", error })
  }

}



module.exports = {
  readProductNew,
  readProductOutsanding,
  readProductAll,
  readProductByIdDanhMuc,
  readProductByIdProduct,
  readSize_ProductByIdProduct,
  readProductByListId
}
