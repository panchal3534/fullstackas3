const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.esd06.mongodb.net/DriveCenter_DB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.set('view cache', false);
console.log('Views path:', path.join(__dirname, 'Views'));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./Routes/authRoutes');
const driverRoutes = require('./Routes/driverRoutes');
app.use('/', authRoutes);
app.use('/', driverRoutes);

app.get('/', (req, res) => {
    console.log('Root route hit');
    res.redirect('/login');
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});