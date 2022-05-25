const router = require('express').Router();
const userController = require('./controllers/userController');
const superheroController = require('./controllers/superheroController');
const likeController = require('./controllers/likeController');
const adminController = require('./controllers/adminController');
const comicsController = require('./controllers/comicsController');

router.use('/users', userController);
router.use('/data/superheroes', superheroController);
router.use('/data/likes', likeController);
router.use('/admin', adminController);
router.use('/data/comics', comicsController);


module.exports = router;