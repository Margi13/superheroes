const Superhero = require('../models/Superhero');
const User = require('../models/User');

exports.approve = (superheroId, superheroData) => Superhero.findByIdAndUpdate(superheroId, superheroData);
exports.decline = (superheroId, superheroData) => Superhero.findByIdAndUpdate(superheroId, superheroData);

exports.getAdmin = (roleId) => User.findOne({ _roleId: roleId });