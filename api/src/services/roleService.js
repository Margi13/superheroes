const Role = require('../models/Role');

exports.ADMIN_ROLE_NAME = 'admin';
exports.USER_ROLE_NAME = 'user';

exports.createRoles = async () => {
    try {
        const adminRoleName = this.ADMIN_ROLE_NAME;
        const userRoleName = this.USER_ROLE_NAME;
        const adminRole = await Role.create({ adminRoleName });
        const userRole = await Role.create({ userRoleName });
        if (adminRole && userRole) {
            return { ok: true };
        } else {
            throw new Error('Cannot create admin and user roles')
        }
    } catch (error) {
        return { type: 'error', message: error.message }
    }
}

exports.getRoleIdByName = (roleName) => Role.findOne(r => r.roleName === roleName);