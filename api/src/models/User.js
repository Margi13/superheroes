const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    email: String,
    password: String,
    _roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }
});

const User = mongoose.model('User', userShema);
//TODO: Bicrypt for password

module.exports = User