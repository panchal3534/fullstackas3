const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    console.log('getLogin called');
    res.render('login', { error: null });
};

exports.getSignup = (req, res) => {
    res.render('signup', { error: null });
};

exports.postSignup = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        return res.render('signup', { error: 'All fields are required' });
    }
    if (password !== confirmPassword) {
        return res.render('signup', { error: 'Passwords do not match' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('signup', { error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
            userType: 'Driver'
        });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Signup Error:', err);
        res.render('signup', { error: 'Error during signup' });
    }
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'User not found. Please signup first' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid password' });
        }
        req.session.user_id = user._id;
        req.session.userType = user.userType;
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Login Error:', err);
        res.render('login', { error: 'Error during login' });
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error('Logout Error:', err);
        res.redirect('/login');
    });
};