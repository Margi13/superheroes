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
    const role = roleService.getRoleIdByName(roleService.USER_ROLE);
    return await User.create({ email, password, _roleId: role._id });
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