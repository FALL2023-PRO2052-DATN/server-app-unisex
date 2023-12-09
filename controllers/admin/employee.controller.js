const multer = require('multer');
const cloudinary = require('../../cloud/cloudinary.js');
const employeeModel = require('../../models/admin/employee.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageEmployee = async (req, res) => {
  try {
    const employees = await employeeModel.getEmployees();
    const employeesReversed = arrayHelpers.reverseArray(employees);
    res.status(200).render('employee', { employees: employeesReversed });
  } catch (error) {
    console.error('Render page employee failed', error);
  }
}

const renderPageInserEmployee = async (req, res) => {
  res.status(200).render('add-employee');
}

const insertEmployee = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return console.error(err);
    }

    if (req.file) {
      try {
        const { username, fullName, phoneNumber, password, address, gender, dateOfBirth } = req.body;

        const imageBuffer = req.file.buffer;
        const imgUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);

        if (imgUrl) {
          const data = { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl };
          await employeeModel.insertEmployee(data);
          req.flash('success', 'Thêm nhân viên thành công');
          res.status(200).redirect('back');
        }
      } catch (error) {
        req.flash('warning', 'Tên đăng nhập đã tồn tại');
        res.status(200).redirect('back');
      }
    }
  });
}

const removeEmployee = async (req, res) => {
  try {
    const employeeID = req.params.employeeID;
    await employeeModel.removeEmployee(employeeID);
    req.flash('success', 'Xoá nhân viên thành công.');
    res.status(200).redirect('back');
  } catch (error) {
    console.error('Removing employee failed', error);
  }
}

module.exports = {
  renderPageEmployee,
  renderPageInserEmployee,
  insertEmployee,
  removeEmployee
}