const User = require('../models/User');

exports.isDriver = (req, res, next) => {
    if (!req.session.user_id || req.session.userType !== 'Driver') {
        return res.redirect('/login');
    }
    next();
};

exports.getDashboard = (req, res) => {
    res.render('dashboard');
};

exports.getG2Page = async (req, res) => {
    try {
        const user = await User.findById(req.session.user_id);
        if (!user) throw new Error('User not found');
        res.render('g2_page', { user });
    } catch (err) {
        console.error('G2 Page Error:', err);
        res.redirect('/dashboard');
    }
};

exports.postG2Page = async (req, res) => {
    try {
        const { firstname, lastname, age, make, model, year, platno, licenseNo } = req.body;
        await User.findByIdAndUpdate(req.session.user_id, {
            firstname: firstname || 'default',
            lastname: lastname || 'default',
            age: age || 0,
            licenseNo: licenseNo || 'default',
            car_details: {
                make: make || 'default',
                model: model || 'default',
                year: year || 0,
                platno: platno || 'default'
            }
        });
        res.redirect('/g-page');
    } catch (err) {
        console.error('G2 Post Error:', err);
        res.redirect('/g2-page');
    }
};

exports.getGPage = async (req, res) => {
    try {
        const user = await User.findById(req.session.user_id);
        if (!user) throw new Error('User not found');
        res.render('g_page', { user });
    } catch (err) {
        console.error('G Page Error:', err);
        res.redirect('/dashboard');
    }
};