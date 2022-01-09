const roleService = require('./services/roleService');
const userService = require('./services/userService');

exports.initializeData = async () => {
    try {
        const roles = await roleService.createRoles();
        const admin = await userService.createAdmin();
        if (roles && admin) {
            return { ok: true };
        } else {
            throw new Error('Cannot initialize roles and admin')
        }
    } catch (error) {
        return { type: 'error', message: error.message };
    }
}
