const authAdminModel = require('../../models/auth/auth.admin.model.js');
const cloudinary = require('../../cloud/cloudinary.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageLogin = async (req, res) => {
    console.log(req.session.user)
    res.render('login')
}

const pageSetting = async (req, res) => {
    console.log(req.session.user)
    res.render('view-profile', {user: req.session.user})
}

const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const signInResult = await authAdminModel.signIn(username, password);
        if(signInResult.length > 0){
            req.session.user = JSON.parse(JSON.stringify(signInResult[0]))
            res.redirect('/');
        }else{
            req.flash('error', 'Đăng nhập không thành công');
            res.redirect('/login');
        }
    } catch (error) {
        handleError(res, error);
    }
}

const signOut = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/login'); // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng xuất
        }
    });
}

const updateProfile = async (req, res) => {
    var newImage = null;
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return;
        }

        if (req.file) {
            // Nếu chọn ảnh thì sẽ upload ảnh lên cloudinary và cập nhật lại ảnh
            const imageBuffer = req.file.buffer;
            newImage = await cloudinary.uploadImageToCloudinary(imageBuffer);
        }

        try {
            const { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl} = req.body;
            const data = { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl};

            if (newImage) {
                data.imgUrl = newImage;
            }

            await authAdminModel.update(data);
            req.flash('success', 'Cập nhật thông tin thành công.');
            res.status(200).redirect('/admin/setting');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error: ' + error);
        }
    });
}

module.exports = {
    pageLogin,
    pageSetting,
    updateProfile,
    signIn,
    signOut
}