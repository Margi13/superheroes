const roleService = require('./services/roleService');
const userService = require('./services/userService');

const ADMIN_EMAIL = 'admin@abv.bg';
const ADMIN_PASSWORD = 'admin';
exports.initializeData = async () => {
    try {
        const roles = await roleService.createRoles();
        const admin = await userService.createAdmin(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('Admin:', admin);
        if (roles && admin) {
            return { ok: true };
        } else {
            throw new Error('Cannot initialize roles and admin');
        }
    } catch (error) {
        return { type: 'error', message: error.message };
    }
}
