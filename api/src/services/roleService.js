const Role = require('../models/Role');

exports.ADMIN_ROLE_NAME = 'ADMIN';
exports.USER_ROLE_NAME = 'USER';

exports.createRoles = async () => {
    try {
        const adminRole = {roleName: this.ADMIN_ROLE_NAME};
        const userRole = {roleName: this.USER_ROLE_NAME};
        
        const adminRoleResult = await Role.create(adminRole);
        const userRoleResult = await Role.create(userRole);
        if (adminRoleResult && userRoleResult) {
            return { ok: true };
        } else {
            throw new Error('Cannot create admin and user roles')
        }
    } catch (error) {
        return { type: 'error', message: error.message }
    }
}

exports.getRoleIdByName = (adminRoleName) => Role.findOne({roleName: adminRoleName});