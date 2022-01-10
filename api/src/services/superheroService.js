const Superhero = require('../models/Superhero')

exports.getAllApproved = () => Superhero.find({status: 1});
exports.getAllPending = () => Superhero.find({status: 0});
exports.getAllDeclined = () => Superhero.find({status: -1});

exports.getOwn = (ownerId) => Superhero.find({ _ownerId: ownerId});
exports.getOne = (superheroId) => Superhero.findById(superheroId);

exports.create = (superheroData) => Superhero.create(superheroData);
exports.update = (superheroId, superheroData) => Superhero.findByIdAndUpdate(superheroId, superheroData);
exports.delete = (superheroId) => Superhero.findByIdAndDelete(superheroId);