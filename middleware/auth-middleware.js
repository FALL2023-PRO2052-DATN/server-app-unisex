const signed = (req, res, next) => {
    if (!req.session.user) {
        return res.status(200).redirect('/login');
    }
    next();
}

module.exports = {
    signed
}