const ensureAuthenticated = (req, res, next) => {
    if (req.session.userId && req.session.userType === 'Driver') {
        return next();
    }
    res.redirect('/login');
};

module.exports = { ensureAuthenticated };