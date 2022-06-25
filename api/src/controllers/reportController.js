const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const reportService = require('../services/reportService');
const comicsService = require('../services/comicsService');
const superheroService = require('../services/superheroService');

router.get('/:id', async (req, res) => {
    const reportId = Number(req.params.id);
    try {
        const result = await reportService.getById(reportId);
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
router.get('/', async (req, res) => {
    try {
        const result = await reportService.getAll();
        return res.json(result);
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.post('/', isAuth, async (req, res) => {
    const { ownerId, reportMessage, dataId } = req.body;
    const newReport = {
        _ownerId: ownerId,
        _dataId: dataId,
        reportMessage,
        active: true,
        _createdOn: new Date()
    };
    try {
        const result = await reportService.create(newReport);
        return res.json(result);
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.put('/:id', isAuth, async (req, res) => {
    const reportId = req.params.id;
    const reportData = req.body;
    const updatedReport = { ...reportData, active: false };
    try {
        const result = await reportService.update(reportId, updatedReport);
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
module.exports = router;