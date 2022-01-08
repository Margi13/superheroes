const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userShema);

module.exports = User