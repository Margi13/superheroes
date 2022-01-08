const router = require('express').Router();
const userController = require('./controllers/userController');
const superheroController = require('./controllers/superheroController');

router.use('/users', userController);
router.use('/data/superheroes', superheroController);


module.exports = router;