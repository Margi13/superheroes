const mongoose = require('mongoose');

const roleShema = new mongoose.Schema({
    roleName: 'ADMIN' | 'USER',
});

const Role = mongoose.model('Role', roleShema);

module.exports = Role