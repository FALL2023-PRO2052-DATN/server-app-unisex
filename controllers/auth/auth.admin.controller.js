const multer = require('multer');
const cloudinary = require('../../cloud/cloudinary.js');
const authAdminModel = require('../../models/auth/auth.admin.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageLogin = async (req, res) => {
    res.render('login');
}

const renderPageSetting = async (req, res) => {
    res.render('setting', { user: req.session.user });
}

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginResult = await authAdminModel.authenticateUser(username, password);

        if (loginResult.length > 0) {
            const user = JSON.parse(JSON.stringify(loginResult[0]));
            req.session.user = user;
            res.redirect('/');
        } else {
            req.flash('error', 'Đăng nhập không thành công');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Login error', error);
    }
}

const handleLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error', err);
        } else {
            res.redirect('/login');
        }
    });
}

const handleUpateProfileUser = async (req, res) => {
    let newImgUrl = null;
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return;
        }

        if (req.file) {
            // Tải ảnh lên Cloudinary
            const imageBuffer = req.file.buffer;
            newImgUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);
        }

        try {
            const { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl } = req.body;
            const data = { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl };

            if (newImgUrl) {
                data.imgUrl = newImgUrl;
            }

            const updateProfileUserResult = await authAdminModel.updateProfileUser(data);

            if (updateProfileUserResult) {
                await updateUserSession(username, req);
                req.flash('success', 'Cập nhật thông tin thành công.');
                res.status(200).redirect('/admin/setting');
            } else {
                req.flash('error', 'Cập nhật thông tin không thành công.');
                res.status(200).redirect('/admin/setting');
            }
        } catch (error) {
            console.error("Update profile error", error);
        }
    });
}

const updateUserSession = async (username, req) => {
    const getCurrentUserResult = await authAdminModel.getCurrentUser(username);

    if (getCurrentUserResult.length > 0) {
        const user = JSON.parse(JSON.stringify(getCurrentUserResult[0]))
        req.session.user = user;
    }
}

module.exports = {
    renderPageLogin,
    renderPageSetting,
    handleUpateProfileUser,
    handleLogin,
    handleLogout
}