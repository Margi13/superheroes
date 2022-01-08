const Superhero = require('../models/Superhero')

exports.getAll = () => Superhero.find();
exports.create = (superheroData) => Superhero.create(superheroData);