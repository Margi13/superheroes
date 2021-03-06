const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const superheroService = require('../services/superheroService');

router.get('/', async (req, res) => {
    try {
        let superheroes = null;
        if (req.query.where) {
            let ownerId = req.query.where.split('=')[1].slice(1, -1);
            superheroes = await superheroService.getOwn(ownerId);
        } else {
            superheroes = await superheroService.getAllApproved();
        }
        if (superheroes) {
            return res.json(superheroes);
        } else {
            return res.json([]);
        }
    } catch (error) {
        return res.json({
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
            return res.json(superhero);
        } else {
            return res.json({});
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.put('/:superheroId', isAuth, async (req, res) => {
    const superheroId = req.params.superheroId;
    const { data, status } = req.body;
    data.status = status ? Number(status) : 0;
    data._updatedOn = Number(status) === 0 ? new Date() : undefined;
    trimData(data);
    try {
        if (!status) {
            const isUnique = await checkForUniqueness(data.heroName, superheroId);
            if (!isUnique) {
                return res.json({
                    type: "error",
                    message: "Hero name should be unique!"
                })
            }
        }
        const superhero = await superheroService.update(superheroId, data);
        if (superhero) {
            return res.json(superhero);
        } else {
            return res.json({ ok: false });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.delete('/:superheroId', isAuth, async (req, res) => {
    const superheroId = req.params.superheroId;
    try {
        const result = await superheroService.delete(superheroId);
        if (result) {
            return res.json({ ok: true });
        } else {
            return res.json({ ok: false });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.post('/', isAuth, async (req, res) => {
    const superheroData = req.body;
    superheroData.status = 0;
    superheroData._createdOn = new Date();
    trimData(superheroData);
    const isUnique = await checkForUniqueness(superheroData.heroName);
    if (!isUnique) {
        return res.json({
            type: "error",
            message: "Hero name should be unique!"
        })
    }
    let ownerId;
    if (req.user) {
        ownerId = req.user._id;
    } else {
        return res.json({
            type: "error",
            message: "User is not found!"
        })
    }
    //TODO: 
    //Find in FE if image extension is .png, .jpg, .jpeg and throw error if not
    //Maybe saving in firebase has to be in server?
    //FE - Animation while waiting images from firebase.
    try {
        let superhero = await superheroService.create({ ...superheroData, _ownerId: ownerId });
        if (superhero) {
            return res.json(superhero);
        } else {
            return res.json({
                type: "error",
                message: "Cannot create superhero"
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }

});
const trimData = (superhero) => {
    superhero.personName = (superhero.personName || '').trim();
    superhero.heroName = (superhero.heroName || '').trim();
    superhero.kind = (superhero.kind || '').trim();
    superhero.story = (superhero.story || '').trim();
}
const checkForUniqueness = async (heroName, heroId) => {
    const heroes = await superheroService.getByHeroName(heroName);
    if (heroId) {
        return heroes.length === 1 && heroes[0]._id.toString() === heroId;
    }
    return heroes.length === 0;
}
module.exports = router;