const jwt = require('jsonwebtoken');

const AUTH_COOKIE_NAME = "cookie"
const JWT_SECRET = 'SECRETTOKEN';
exports.auth = function (req, res, next) {
    let token = req.headers['X-Authorization'];
    if (token) {
        let decodedToken = jwt.verify(token, JWT_SECRET)
        if (decodedToken) {
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        } else {
            res.status(401).json('You are not authorized')
        }
    } else {
        next();
    }
}

// exports.isAuth = function (req, res, next){
//     if(req.user){
//         next();
//     }else{
//         res.status(401).json('You are not authorized');
//     }
// }
// exports.isGuest = function (req, res, next){
//     if(!req.user){
//         next();
//     }else{
//         res.status(401).json('You are already authorized');
//     }
// }