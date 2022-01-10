const router = require('express').Router();
const adminService = require('../services/adminService');
const roleService = require('../services/roleService');
const superheroService = require('../services/superheroService');

const isAdmin = true;
router.get('/', async (req, res) => {
    try {
        const role = await roleService.getRoleIdByName(roleService.ADMIN_ROLE_NAME);
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
        if (isAdmin) {
            const superheroes = await superheroService.getAllPending();
            if (superheroes) {
                res.json(superheroes);
            } else {
                res.json([]);
            }
        } else {
            throw new Error('Only administrator can do this!')
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
        if (isAdmin) {
            const superheroId = req.params.superheroId;
            const superhero = await superheroService.getOne(superheroId);
            if (superhero) {
                superhero.status = 1;
                const approved = await adminService.approve(superheroId, superhero);
                console.log(approved);
                if (approved) res.json({ ok: true });
                else throw new Error('Cannot approve this superhero!');
            }
            else throw new Error('Cannot find this superhero!');
        }
        else throw new Error('Only administrator can do this!');
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        });
    }
});
router.put('/decline/:superheroId', async (req, res) => {
    try {
        if (isAdmin) {
            const superheroId = req.params.superheroId;
            const superhero = await superheroService.getOne(superheroId);
            if (superhero) {
                superhero.status = -1;
                const declined = await adminService.decline(superheroId, superhero);
                if (declined) res.json({ ok: true });
                else throw new Error('Cannot decline this superhero!');
            }
            else throw new Error('Cannot find this superhero!');
        }
        else throw new Error('Only administrator can do this!');
    } catch (error) {
        res.json({
            type: 'error',
            message: error.message
        });
    }
});
module.exports = router;