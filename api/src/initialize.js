const roleService = require('./services/roleService');
const userService = require('./services/userService');
const { ADMIN_ROLE_NAME } = require('./utils/constants');

exports.initializeData = async () => {
    try {
        const adminRole = await roleService.getRoleByName(ADMIN_ROLE_NAME);
        if (!adminRole) {
            const roles = await roleService.createRoles();
            const admin = await userService.createAdmin();
            if (roles && admin) {
                return { ok: true };
            } else {
                throw new Error('Cannot initialize roles and admin');
            }
        }
    } catch (error) {
        return { type: 'error', message: error.message };
    }
}
