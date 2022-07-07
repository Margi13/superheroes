const router = require('express').Router();
const { isAdmin } = require('../middlewares/authMiddleware');
const adminService = require('../services/adminService');
const roleService = require('../services/roleService');
const superheroService = require('../services/superheroService');
const comicsService = require('../services/comicsService');
const reportService = require('../services/reportService');
const { ADMIN_ROLE_NAME } = require('../utils/constants');

router.get('/', async (req, res) => {
    try {
        const role = await roleService.getRoleByName(ADMIN_ROLE_NAME);
        const admin = await adminService.getAdmin(role._id);
        if (admin) {
            return res.json({ adminId: admin._id });
        } else {
            return res.json({
                type: 'error',
                message: 'Cannot find user with role administrator'
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

router.get('/pending/heroes', async (req, res) => {
    try {
        const superheroes = await superheroService.getAllPending();
        if (superheroes) {
            return res.json(superheroes);
        } else {
            return res.json([]);
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

router.get('/pending/comics', async (req, res) => {
    try {
        const comics = await comicsService.getAllPending();
        if (comics) {
            return res.json(comics);
        } else {
            return res.json([]);
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

router.put('/approve/heroes/:superheroId', isAdmin, async (req, res) => {
    const superheroId = req.params.superheroId;
    try {
        const superhero = await superheroService.getOne(superheroId);
        if (superhero) {
            superhero.status = 1;
            superhero.reports = [];
            const approved = await adminService.approveHero(superheroId, superhero);
            if (approved) return res.json({ ok: true });
            else {
                return res.json({
                    type: 'error',
                    message: 'Cannot approve this superhero!'
                });
            }
        }
        else {
            return res.json({
                type: 'error',
                message: 'Cannot find this superhero!'
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

router.put('/approve/comics/:comicsId', isAdmin, async (req, res) => {
    const comicsId = req.params.comicsId;
    try {
        const comics = await comicsService.getOne(comicsId);
        if (comics) {
            comics.status = 1;
            comics.reports = [];
            const approved = await adminService.approveComics(comicsId, comics);
            if (approved) return res.json({ ok: true });
            else {
                return res.json({
                    type: 'error',
                    message: 'Cannot approve this comics!'
                });
            }
        }
        else {
            return res.json({
                type: 'error',
                message: 'Cannot find this comics!'
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

router.put('/decline/heroes/:superheroId', isAdmin, async (req, res) => {
    const superheroId = req.params.superheroId;
    const { adminId, reportMessage } = req.body;
    try {
        const superhero = await superheroService.getOne(superheroId);
        if (superhero) {
            superhero.status = -1;
            const report = await reportService.create({ _ownerId: adminId, reportMessage, active: true, _createdOn: new Date() })
            superhero.reports.push(report);
            const declined = await adminService.declineHero(superheroId, superhero);
            if (declined) return res.json({ ok: true });
            else {
                return res.json({
                    type: 'error',
                    message: 'Cannot decline this superhero!'
                });
            }
        } else {
            return res.json({
                type: 'error',
                message: 'Cannot find this superhero!'
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

router.put('/decline/comics/:comicsId', isAdmin, async (req, res) => {
    const comicsId = req.params.comicsId;
    const { adminId, reportMessage } = req.body;
    try {
        const comics = await comicsService.getOne(comicsId);
        if (comics) {
            comics.status = -1;
            const report = await reportService.create({ _ownerId: adminId, reportMessage, active: true, _createdOn: new Date() })
            comics.reports.push(report);
            const declined = await adminService.declineComics(comicsId, comics);
            if (declined) return res.json({ ok: true });
            else {
                return res.json({
                    type: 'error',
                    message: 'Cannot decline this comics!'
                });
            }
        }
        else throw new Error('Cannot find this comics!');
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        });
    }
});

module.exports = router;