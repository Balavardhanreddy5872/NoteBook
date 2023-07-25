const jwt = require('jsonwebtoken');
const JWT_sceret = 'bvr12345'

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authenicate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_sceret)
        req.user = data.user
    } catch (error) {
        res.status(401).send({ error: "please authenicate using a valid token" });
    }
    next();
}
module.exports = fetchuser;