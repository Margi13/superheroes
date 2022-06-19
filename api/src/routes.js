const router = require('express').Router();
const userController = require('./controllers/userController');
const superheroController = require('./controllers/superheroController');
const likeController = require('./controllers/likeController');
const reportController = require('./controllers/reportController');
const adminController = require('./controllers/adminController');
const comicsController = require('./controllers/comicsController');

router.use('/users', userController);
router.use('/data/superheroes', superheroController);
router.use('/data/comics', comicsController);
router.use('/data/likes', likeController);
router.use('/data/reports', reportController);
router.use('/admin', adminController);


module.exports = router;