const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['User', 'Contributor', 'Admin'],
    },
    avatar: String,
    googleId: String,
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);