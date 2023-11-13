const multer = require('multer');
const cloudinary = require('../../cloud/cloudinary.js');
const authAdminModel = require('../../models/auth/auth.admin.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageLogin = async (req, res) => {
    res.status(200).render('login');
}

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginResults = await authAdminModel.authenticateUser(username, password);

        if (loginResults.length > 0) {
            const user = loginResults[0];
            req.session.user = user;
            res.status(200).redirect('/');
        } else {
            req.flash('error', 'Đăng nhập không thành công.');
            res.status(200).redirect('/login');
        }
    } catch (error) {
        console.error('Login error', error.message);
    }
}

const handleLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error', err);
        } else {
            res.status(200).redirect('/login');
        }
    });
}

const renderPageSetting = async (req, res) => {
    const user = req.session.user;
    res.status(200).render('setting', { user });
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

            const updateProfileUserResults = await authAdminModel.updateProfileUser(data);

            if (updateProfileUserResults) {
                await updateUserSession(username, req);
                req.flash('success', 'Cập nhật thông tin thành công.');
            } else {
                req.flash('error', 'Cập nhật thông tin không thành công.');
            }

            res.status(200).redirect('/admin/setting');
        } catch (error) {
            console.error('Update profile error', error);
        }
    });
}

const updateUserSession = async (username, req) => {
    const results = await authAdminModel.getCurrentUser(username);
    const user = JSON.parse(JSON.stringify(results[0]));

    if (user) {
        req.session.user = user;
    }
}

module.exports = {
    renderPageLogin,
    handleLogin,
    handleLogout,
    renderPageSetting,
    handleUpateProfileUser,
}