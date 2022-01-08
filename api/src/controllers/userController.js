const router = require('express').Router();
const userService = require('../services/userService')
router.post('/register', async (req, res) => {
    console.log(req.body)
    let { email, password } = req.body;
    try{
        let user = await userService.register({ email, password });
        let {token} = await userService.login({email, password});

        res.json({ 
            _id: user._id,
            email: user.email,
            accessToken: token
        })
    }catch(error){
        res.json({
            type: 'error',
            message: error.message
        })
    }
});

router.post('/login', async (req, res)=>{
    let { email, password } = req.body;
    try{
        let {user, token} = await userService.login({email, password});

        res.json({ 
            _id: user._id,
            email: user.email,
            accessToken: token
        })
    }catch(error){
        res.json({
            type: 'error',
            message: error.message
        })
    }
})
module.exports = router;