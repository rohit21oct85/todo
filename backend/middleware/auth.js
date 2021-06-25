const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
    if (!token) {
        res.status(401).json({
            message: 'you are not authorised!'
        });
    } else {
        jwt.verify(token, accessTokenSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Authorization failed'
                });
            } else {
                req.body.user_id = decoded.id;
                req.body.user_email = decoded.email;
                next()
            }
        })
    }
}