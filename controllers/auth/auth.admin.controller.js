const authAdminModel = require('../../models/auth/auth.admin.model.js');

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageLogin = async (req, res) => {
    console.log(req.session.user)
    res.render('login')
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

module.exports = {
    pageLogin,
    signIn,
    signOut
}