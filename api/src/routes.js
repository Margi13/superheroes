const router = require('express').Router();
const userController = require('./controllers/userController');
const superheroController = require('./controllers/superheroController');
const adminController = require('./controllers/adminController');

router.use('/users', userController);
router.use('/data/superheroes', superheroController);
router.use('/admin', adminController);


module.exports = router;