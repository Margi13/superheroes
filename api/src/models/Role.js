const mongoose = require('mongoose');

const roleShema = new mongoose.Schema({
    roleName: String
});

const Role = mongoose.model('Role', roleShema);

module.exports = Role