const comicsService = require('../services/comicsService');
const superheroService = require('../services/superheroService');

exports.isOwnComics = function(req,res,next) {
    let comics = comicsService.getOne(req.params.comicsId);
    if(comics._ownerId === req.user._id) {
        next();
    } else {
        res.status(401).json('You are not authorized');
    }
}

exports.isOwnHero = function(req,res,next) {
    let hero = superheroService.getOne(req.params.heroId);
    if(hero._ownerId === req.user._id) {
        next();
    } else {
        res.status(401).json('You are not authorized');
    }
}