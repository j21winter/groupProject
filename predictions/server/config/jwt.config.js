const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

module.exports.secret = secret_key;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret_key, (err, payload) => {
        if(err){
            res.status(401).json({ verified: false, error: err.message })
        } else {
            next()
        }
    })
} 