const multer = require('multer');
const cloudinary = require('../cloud/cloudinary.js');
const employeeAdminModel = require('../models/employee.admin.model.js');
const arrayHelpers = require('../helpers/array-helpers.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const isUserExists = (employees, username) => {
    return employees.some((employee) => employee.ten_dang_nhap === username);
}

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageAdminEmployee = async (req, res) => {
    try {
        const employees = await employeeAdminModel.getAll();
        const employeesReversed = arrayHelpers.reverseArray(employees);
        res.render('employee', {employees: employeesReversed});
    } catch (error) {
        handleError(res, error);
    }
}

const pageInsertEmployee = async (req, res) => {
    res.render('add-employee');
}

const insertEmployee = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return console.error(err);
        }

        if (req.file) {
            try {
                const { username, fullName, phoneNumber, password, address, gender, dateOfBirth } = req.body;
                const employees = await employeeAdminModel.getAll();

                if(isUserExists(employees, username) || username === 'admin'){
                    req.flash('warning', 'Tên đăng nhập đã tồn tại');
                    res.status(200).redirect('/admin/employee/create');
                    return;
                }

                // Tải ảnh lên cloudinary
                const imageBuffer = req.file.buffer;
                const imgUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);
                
                if (imgUrl) {
                    const data = { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl};

                    // Thêm nhân viên
                    await employeeAdminModel.insert(data);

                    req.flash('success', 'Thêm nhân viên thành công');
                    res.status(200).redirect('/admin/employee/create');
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error: ' + error.message);
            }
        }
    });
}

const removeEmployee = async (req, res) => {
    try {
        const { idEmployee } = req.body;
        await employeeAdminModel.remove(idEmployee);

        req.flash('success', 'Xoá Xoá nhân viên thành công.');
        res.status(200).redirect('/admin/employee');
    } catch (error) {
        handleError(res, error);
    }
}


module.exports = {
    pageAdminEmployee,
    pageInsertEmployee,
    insertEmployee,
    removeEmployee,
}