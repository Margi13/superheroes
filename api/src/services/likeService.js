const Like = require('../models/Like');

exports.create = (likeData) => Like.create(likeData);

exports.getLikesByHeroId = (heroId, toGet) => Like.find({_superheroId: heroId});