const Superhero = require('../models/Superhero')

exports.getAll = () => Superhero.find();
exports.getOne = (superheroId) => Superhero.findById(superheroId);
exports.create = (superheroData) => Superhero.create(superheroData);