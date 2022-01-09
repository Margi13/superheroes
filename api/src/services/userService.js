const jwt = require('jsonwebtoken');
const User = require('../models/User');
const roleService = require('./roleService');

const ADMIN_EMAIL = 'admin@abv.bg';
const ADMIN_PASSWORD = 'admin';

exports.createAdmin = async () => {
    const roleId = roleService.getRoleIdByName(roleService.ADMIN_ROLE);
    const adminEmail = this.ADMIN_EMAIL;
    const adminPass = this.ADMIN_PASSWORD;
    const result = await User.create({ adminEmail, adminPass, roleId });
    if (result) {
        return result;
    } else {
        throw new Error('Cannot register admin user')
    }
};

exports.register = async ({ email, password }) => {
    const roleId = roleService.getRoleIdByName(roleService.USER_ROLE);
    return await User.create({ email, password, roleId });
};

exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (user) {
        let token = jwt.sign({ _id: user._id, email: user.email }, 'SECRETTOKEN');

        return { user, token };
    } else {
        throw new Error('No such user');
    }
}