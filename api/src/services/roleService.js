const Role = require('../models/Role');
const { ADMIN_ROLE_NAME, USER_ROLE_NAME } = require('../utils/constants');

exports.createRoles = async () => {
    try {
        const adminRole = { roleName: ADMIN_ROLE_NAME };
        const userRole = { roleName: USER_ROLE_NAME };

        const adminRoleResult = await Role.create(adminRole);
        const userRoleResult = await Role.create(userRole);
        if (adminRoleResult._id && userRoleResult._id) {
            return { ok: true };
        } else {
            throw new Error('Cannot create admin and user roles')
        }
    } catch (error) {
        return { type: 'error', message: error.message }
    }
}

exports.getRoleByName = (adminRoleName) => Role.findOne({ roleName: adminRoleName });