const jwt = require('jsonwebtoken');
const config = require('./authConfig');

const JWTcheck = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Unauthorized!' });
            }
            req.user = user;

            return next();
        });
    } else {
        res.status(401).json({ message: 'No token provided!' });
    }
};

module.exports = JWTcheck;
