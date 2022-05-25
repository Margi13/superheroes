const router = require('express').Router();
const { isAdmin } = require('../middlewares/authMiddleware');
const adminService = require('../services/adminService');
const roleService = require('../services/roleService');
const superheroService = require('../services/superheroService');
const { ADMIN_ROLE_NAME } = require('../utils/constants');

router.get('/', async (req, res) => {
    try {
        isAdmin();
        const role = await roleService.getRoleIdByName(ADMIN_ROLE_NAME);
        const admin = await adminService.getAdmin(role._id);
        if (admin) {
            res.json({ adminId: admin._id });
        } else {
            throw new Error('Cannot find user with role administrator')
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        });
    }
});
router.get('/pending', async (req, res) => {
    try {
        isAdmin();
        const superheroes = await superheroService.getAllPending();
        if (superheroes) {
            res.json(superheroes);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        });
    }
});
router.put('/approve/:superheroId', async (req, res) => {
    try {
        isAdmin();
        const superheroId = req.params.superheroId;
        const superhero = await superheroService.getOne(superheroId);
        if (superhero) {
            superhero.status = 1;
            const approved = await adminService.approve(superheroId, superhero);
            if (approved) res.json({ ok: true });
            else throw new Error('Cannot approve this superhero!');
        }
        else throw new Error('Cannot find this superhero!');
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        });
    }
});
router.put('/decline/:superheroId', async (req, res) => {
    try {
        isAdmin();
        const superheroId = req.params.superheroId;
        const superhero = await superheroService.getOne(superheroId);
        if (superhero) {
            superhero.status = -1;
            const declined = await adminService.decline(superheroId, superhero);
            if (declined) res.json({ ok: true });
            else throw new Error('Cannot decline this superhero!');
        }
        else throw new Error('Cannot find this superhero!');
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        });
    }
});
module.exports = router;