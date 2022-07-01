const Superhero = require('../models/Superhero');
const Comics = require('../models/Comics');
const User = require('../models/User');

exports.approveHero = (superheroId, superheroData) => Superhero.findByIdAndUpdate(superheroId, superheroData);
exports.approveComics = (comicsId, comicsData) => Comics.findByIdAndUpdate(comicsId, comicsData);
exports.declineHero = (superheroId, superheroData) => Superhero.findByIdAndUpdate(superheroId, superheroData);
exports.declineComics = (comicsId, comicsData) => Comics.findByIdAndUpdate(comicsId, comicsData);

exports.getAdmin = (roleId) => User.findOne({ _roleId: roleId });