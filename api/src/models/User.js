const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [/[a-z].+@[a-zA-Z]+\.[a-zA-Z]+/g, 'The email should be in the following format: <name>@<domain>.<extension>'],
        required: true
    },
    password: {
        type: String,
        validate: [/[^a-zA-Z0-9]+/g, 'The password should include only latin letters and 0-9 digits'],
        minLength: [4, 'The password should be at least 4 characters long'],
        required: true
    },
    _roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }
});
userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        })
        .catch((error) => { throw error });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password)
        .catch((error) => { throw error });
});
const User = mongoose.model('User', userSchema);

module.exports = User