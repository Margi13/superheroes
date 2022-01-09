const router = require('express').Router();
const superheroService = require('../services/superheroService');

router.get('/', async (req, res) => {
    try {
        let superheroes = await superheroService.getAllApproved();
        if (superheroes) {
            res.json(superheroes);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/:superheroId', async (req, res) => {
    try {
        let superheroId = req.params.superheroId;
        let superhero = await superheroService.getOne(superheroId);
        if (superhero) {
            res.json(superhero);
        } else {
            res.json({});
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.put('/:superheroId', async (req, res) => {
    try {
        let superheroId = req.params.superheroId;
        let superheroData = req.body;
        superhero.status = 0;
        let superhero = await superheroService.update(superheroId,superheroData);
        if (superhero) {
            res.json({ok: true});
        } else {
            res.json({ok: false});
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.post('/', async (req, res) => {
    const superheroData = req.body;
    const ownerId = req.user._id;
    //TODO: 
    //Find if there is superhero with given heroic name and throw error if there is
    //Find if there is superhero with given real name and throw error if there is
    //Find in FE if image extension is .png, .jpg, .jpeg and throw error if not
    //Rename image in FE with heroName.*
    //Rename image in FE for firebase: userId_heroName.*
    //Make util for extracting heroName from firebase image to compare it
    //Maybe saving in firebase has to be in server?
    //FE - Animation while waiting images from firebase.
    try {
        let superhero = await superheroService.create({ ...superheroData,status: 0, _ownerId: ownerId });
        if (superhero) {
            res.json({ ok: true });
        } else {
            throw new Error('Cannot create superhero');
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }

});
module.exports = router;