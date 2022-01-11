const jwt = require('jsonwebtoken');
const User = require('../models/User');
const roleService = require('./roleService');

exports.createAdmin = async (adminEmail, adminPass) => {
    const role = await roleService.getRoleIdByName('ADMIN');
    const admin = { email: adminEmail, password: adminPass, _roleId: role._id }
    const result = await User.create(admin);
    if (result) {
        return result;
    } else {
        throw new Error('Cannot register admin user');
    }
};

exports.register = async ({ email, password }) => {
    const role = await roleService.getRoleIdByName('USER');
    const user = { email: email, password: password, _roleId: role._id }
    return await User.create(user);
};

exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (user) {
        let isValid = await user.validatePassword(password);
        if (isValid) {
            let token = jwt.sign({ _id: user._id, email: user.email }, 'SECRETTOKEN');
            return { user, token };
        } else {
            throw new Error('Invalid username or password!');
        }

    } else {
        throw new Error('Invalid username or password!');
    }
}