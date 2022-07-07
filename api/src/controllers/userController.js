const router = require('express').Router();
const { isGuest, isAuth } = require('../middlewares/authMiddleware');
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
	let { email, password } = req.body;
	try {
		let user = await userService.register({ email, password });
		let { token } = await userService.login({ email, password });

		res.status(200).json({
			_id: user._id,
			email: user.email,
			accessToken: token
		})
	} catch (error) {
		res.status(400).json({
			type: 'error',
			message: error.message
		})
	}
});

router.post('/login', async (req, res) => {
	let { email, password } = req.body;
	try {
		let { user, token } = await userService.login({ email, password });

		res.status(200).json({
			_id: user._id,
			email: user.email,
			accessToken: token
		})
	} catch (error) {
		res.status(400).json({
			type: 'error',
			message: error.message
		})
	}
});

router.get('/logout', isAuth, (req, res) => {
	res.status(200).json({ ok: true });
})
module.exports = router;