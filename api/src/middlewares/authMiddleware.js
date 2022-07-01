const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/constants');

exports.auth = (req, res, next) => {
    let token = req.headers['x-authorization'];
    if (token) {
        let decodedToken = jwt.verify(token, JWT_SECRET)
        if (decodedToken) {
            req.user = decodedToken;
            next();
        } else {
            res.status(401).json('You are not authorized')
        }
    } else {
        next();
    }
}

exports.isAuth = function (req, res, next) {
    if (req.user && req.user.email) {
        next();
    } else {
        res.status(401).json('You are not authorized');
    }
}
exports.isGuest = function (req, res, next) {
    if (req.user && !req.user.email) {
        next();
    } else {
        res.status(401).json('You are already authorized');
    }
}
exports.isAdmin = function (req, res, next) {
    if (req.user && req.user.email && req.user.email.toString() === 'admin@abv.bg') {
        next();
    } else {
        res.status(401).json('You are not administrator');
    }
}