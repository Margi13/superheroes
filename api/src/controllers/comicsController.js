const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const comicsService = require('../services/comicsService');

router.get('/', async (req, res) => {
    try {
        let comics = null;
        if (req.query.where) {
            let ownerId = req.query.where.split('=')[1].slice(1, -1);
            comics = await comicsService.getOwn(ownerId);
        } else {
            comics = await comicsService.getAllApproved();
        }
        if (comics) {
            res.json(comics);
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
router.get('/:comicsId', async (req, res) => {
    try {
        let comicsId = req.params.comicsId;
        let comics = await comicsService.getOne(comicsId);
        if (comics) {
            res.json(comics);
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
router.put('/:comicsId', isAuth, async (req, res) => {
    // isAuth();
    try {
        let comicsId = req.params.comicsId;
        let comicsData = req.body;
        comicsData.status = 0;
        let comics = await comicsService.update(comicsId, comicsData);
        if (comics) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false });
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.delete('/:comicsId', isAuth, async (req, res) => {
    try {
        let comicsId = req.params.comicsId;
        let result = await comicsService.delete(comicsId);
        if (result) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false });
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.post('/', isAuth, async (req, res) => {
    const comicsData = req.body;
    comicsData.status = 0;
    let ownerId;
    if (req.user) {
        ownerId = req.user._id;
    } else {
        res.json({
            type: "error",
            message: "User is not found!"
        })
    }
    //TODO:
    //Find if there is comics with given title and throw error if there is
    //Find in FE if image extension is .png, .jpg, .jpeg and throw error if not
    //Rename images in FE with comicsTitle.stepOrder.*
    //Rename image in FE for firebase: userId_comicsTitle.stepOrder.*
    //Make util for extracting comicsTitle from firebase image to compare it
    //Maybe saving in firebase has to be in server?
    //FE - Animation while waiting images from firebase.
    try {
        let comics = await comicsService.create({ ...comicsData, _ownerId: ownerId });
        if (comics) {
            res.json({ ok: true });
        } else {
            throw new Error('Cannot create comics');
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        })
    }
});

module.exports = router;