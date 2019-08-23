var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    avatar: String,
    googleId: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', userSchema);