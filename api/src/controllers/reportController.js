const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const reportService = require('../services/reportService');
const comicsService = require('../services/comicsService');

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
    const comicsId = req.query.where.split('=')[1].slice(1, -1);
    try {
        const comics = await comicsService.getById(comicsId);

        if (comics && comics.reports.length > 0) {
            const promises = [];
            comics.reports.forEach(reportId => {
                const reportPromise = reportService.getById(reportId);
                promises.push(reportPromise);
            });
            const result = await Promise.all(promises)
            return res.json(result);
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
router.post('/', isAuth, async (req, res) => {
    console.log('create report')
    const { ownerId, reportMessage } = req.body;
    const newReport = {
        _ownerId: ownerId,
        reportMessage,
        active: true,
        _createdOn: new Date()
    };
    try {
        const result = await reportService.create(newReport);
        if (result) {
            return res.json(result);
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
router.put('/:id', isAuth, async (req, res) => {
    const reportId = req.params.id;
    const reportData = req.body;
    const updatedReport = { ...reportData, active: false };
    try {
        const result = await reportService.update(reportId, updatedReport);
        if (result) {
            return res.json({ ok: true });
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
module.exports = router;