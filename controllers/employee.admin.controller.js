const multer = require('multer');
const cloudinary = require('../cloud/cloudinary.js');
const employeeAdminModel = require('../models/employee.admin.model.js');
const arrayHelpers = require('../helpers/array-helpers.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const isUserExists = (employees, username) => {
    return employees.some((employee) => employee.ten_dang_nhap === username);
}

const renderPageEmployee = async (req, res) => {
    try {
        const employees = await employeeAdminModel.getEmployeesByRoleStaff();
        const employeesReversed = arrayHelpers.reverseArray(employees);

        res.status(200).render('employee', { employees: employeesReversed });
    } catch (error) {
        console.log('Render page employee error: ' + error.message);
    }
}

const renderPageInserEmployee = async (req, res) => {
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
                const employees = await employeeAdminModel.getEmployees();

                if (isUserExists(employees, username) || username === 'admin') {
                    req.flash('warning', 'Tên đăng nhập đã tồn tại');
                    res.status(200).redirect('/admin/employee/create');
                    return;
                }

                // Tải ảnh lên cloudinary
                const imageBuffer = req.file.buffer;
                const imgUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);

                if (imgUrl) {
                    const data = { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl };
                    await employeeAdminModel.insertEmployee(data);
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
        const { employeeID } = req.body;
        await employeeAdminModel.removeEmployee(employeeID);
        
        req.flash('success', 'Xoá Xoá nhân viên thành công.');
        res.status(200).redirect('/admin/employee');
    } catch (error) {
        console.log('Remove employee error: ' + error.message);
    }
}


module.exports = {
    renderPageEmployee,
    renderPageInserEmployee,
    insertEmployee,
    removeEmployee,
}