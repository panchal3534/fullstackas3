const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, default: 'default' },
    lastname: { type: String, default: 'default' },
    licenseNo: { type: String, default: 'default' },
    age: { type: Number, default: 0 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will be encrypted
    userType: { type: String, enum: ['Driver', 'Examiner', 'Admin'], default: 'Driver' },
    car_details: {
        make: { type: String, default: 'default' },
        model: { type: String, default: 'default' },
        year: { type: Number, default: 0 },
        platno: { type: String, default: 'default' }
    }
});

module.exports = mongoose.model('User', userSchema);