const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Driver', 'Examiner', 'Admin'], default: 'Driver' },
    firstName: { type: String, default: 'default' },
    lastName: { type: String, default: 'default' },
    licenceNumber: { type: String, default: 'default' },
    age: { type: Number, default: 0 },
    carDetails: {
        make: { type: String, default: 'default' },
        model: { type: String, default: 'default' },
        year: { type: Number, default: 0 },
        plateNumber: { type: String, default: 'default' }
    }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);