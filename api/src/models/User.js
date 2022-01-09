const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    email: String,
    password: String,
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('User', userShema);
//TODO: Bicrypt for password

module.exports = User