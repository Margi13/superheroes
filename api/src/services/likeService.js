const Like = require('../models/Like');

exports.create = (likeData) => Like.create(likeData);

exports.getLikesByHeroId = (heroId) => Like.find({ _superheroId: heroId });