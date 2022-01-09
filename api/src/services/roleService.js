const Role = require('../models/Role');

exports.ADMIN_ROLE = 'admin';
exports.USER_ROLE = 'user';

exports.createRoles = async () => {
    try {
        const adminRole = await Role.create({ ADMIN_ROLE });
        const userRole = await Role.create({ USER_ROLE });
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