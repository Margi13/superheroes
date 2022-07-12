const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const comicsService = require('../services/comicsService');

router.get('/', async (req, res) => {
    try {
        let comics = null;
        if (req.query.where) {
            const ownerId = req.query.where.split('=')[1].slice(1, -1);
            comics = await comicsService.getOwn(ownerId);
        } else {
            comics = await comicsService.getAllApproved();
        }
        if (comics) {
            return res.json(comics);
        } else {
            return res.json([]);
        }
    } catch (error) {
        console.log(error.message)
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/:comicsId', async (req, res) => {
    try {
        const comicsId = req.params.comicsId;
        const comics = await comicsService.getOne(comicsId);
        if (comics) {
            return res.json(comics);
        } else {
            return res.json({});
        }
    } catch (error) {
        console.log(error.message)
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.put('/:comicsId', isAuth, async (req, res) => {
    const comicsId = req.params.comicsId;
    const { data, status } = req.body;
    data.status = status ? status : 0;
    data.coverPage = data.coverPage ? data.coverPage : data.imagesUrl[0];
    data._updatedOn = Number(status) === 0 ? new Date() : undefined;
    trimData(data);
    try {
        if (!status) {
            const isUnique = await checkForUniqueness(data.title);
            if (!isUnique) {
                return res.json({
                    type: "error",
                    message: "Comics title should be unique"
                })
            }
        }
        const comics = await comicsService.update(comicsId, data);
        if (comics) {
            return res.json(comics);
        } else {
            return res.json({ ok: false });
        }
    } catch (error) {
        console.log(error.message)
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.delete('/:comicsId', isAuth, async (req, res) => {
    try {
        const comicsId = req.params.comicsId;
        const result = await comicsService.delete(comicsId);
        if (result) {
            return res.json({ ok: true });
        } else {
            return res.json({ ok: false });
        }
    } catch (error) {
        console.log(error.message)
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.post('/', isAuth, async (req, res) => {
    const comicsData = req.body;
    comicsData.status = 0;
    comicsData.coverPage = comicsData.coverPage ? comicsData.coverPage : comicsData.imagesUrl[0];
    comicsData._createdOn = new Date();
    trimData(comicsData);
    const isUnique = await checkForUniqueness(comicsData.title);
    if (!isUnique) {
        return res.json({
            type: "error",
            message: "Comics title should be unique"
        })
    }
    let ownerId;
    if (req.user) {
        ownerId = req.user._id;
    } else {
        return res.json({
            type: "error",
            message: "User is not found!"
        });
    }
    //TODO:
    //Find in FE if image extension is .png, .jpg, .jpeg and throw error if not
    //FE - Animation while waiting images from firebase.
    try {
        const comics = await comicsService.create({ ...comicsData, _ownerId: ownerId });
        if (comics) {
            return res.json(comics);
        } else {
            return res.json({
                type: "error",
                message: "Cannot create comics"
            });
        }
    } catch (error) {
        console.log(error.message)
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
const trimData = (comics) => {
    comics.title = (comics.title || '').trim();
    comics.genre = (comics.genre || '').trim();
    comics.description = comics.description.trim();
}
const checkForUniqueness = async (title) => {
    const comics = await comicsService.getByTitle(title);
    return comics.length > 0 ? false : true;
}

module.exports = router;