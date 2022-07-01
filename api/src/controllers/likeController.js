const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const likeService = require('../services/likeService');

router.get('/', async (req, res) => {
    const superheroId = req.query.where.split('=')[1].slice(1, -1);
    try {
        const result = await likeService.getLikesByHeroId(superheroId);
        if (result) {
            res.json(result);
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
router.post('/', isAuth, async (req, res) => {
    const superheroId = req.body.heroId;
    const ownerId = req.body.ownerId;
    const newLike = { _ownerId: ownerId, _superheroId: superheroId };
    try {
        const result = await likeService.create(newLike);
        if (result) {
            res.json(result);
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
module.exports = router;