const multer = require('multer');
const cloudinary = require('../../cloud/cloudinary.js');
const authAdminModel = require('../../models/auth/auth.admin.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageLogin = async (req, res) => {
  res.render('login');
}

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Xác thực người dùng
    const loginResults = await authAdminModel.authenticateUser({
      username,
      password
    });

    if (loginResults.length > 0) {
      const user = loginResults[0];
      req.session.user = user;
      res.redirect('/');
    } else {
      req.flash('error', 'Đăng nhập không thành công.');
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Login failure', error);
  }
}

const handleLogout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Logout falied', error);
    } else {
      res.redirect('/login');
    }
  });
}

const renderPageSetting = async (req, res) => {
  const user = req.session.user;  
  res.render('setting', { user });
}

const handleUpateProfileUser = async (req, res) => {
  let newImgUrl = null;
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return;
    }

    if (req.file) {
      const imageBuffer = req.file.buffer;
      newImgUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);
    }

    try {
      const { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl } = req.body;
      const data = { username, fullName, phoneNumber, password, address, gender, dateOfBirth, imgUrl };

      if (newImgUrl) {
        data.imgUrl = newImgUrl;
      }
      // Cập nhật thông tin admin
      const updateProfileUserResults = await authAdminModel.updateProfileUser(data);

      if (updateProfileUserResults) {
        await updateUserSession(username, req);
        req.flash('success', 'Cập nhật thông tin thành công.');
      } else {
        req.flash('error', 'Cập nhật thông tin không thành công.');
      }

      res.redirect('/admin/setting');
    } catch (error) {
      console.error('Update profile failed', error);
    }
  });
}

const updateUserSession = async (username, req) => {
  // Cập nhật lại phiên bản người dùng hiện tại
  const results = await authAdminModel.getCurrentUser(username);

  const currentUser = results[0];
  if (currentUser) {
    req.session.user = currentUser;
    console.log("🚀 ~ file: auth.admin.controller.js:93 ~ updateUserSession ~ user:", req.session.use)
  }
}

module.exports = {
  renderPageLogin,
  handleLogin,
  handleLogout,
  renderPageSetting,
  handleUpateProfileUser
}