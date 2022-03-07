const jwt = require('jsonwebtoken');
const pool = require('./db');

// verify user auth token
const checkToken = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader && req.originalUrl != "/api/login") {
      return res.status(400).send("Token not available!");
    }
    // login api to fetch token
    if (req.originalUrl == "/api/login") {
        return next()
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    // except login other api's fail if token is not specified
    if (!token && req.originalUrl != "/api/login") {
        return res.status(400).send("Token not available!");
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log('TOKEN', decoded);
        const userData = await pool.query(`SELECT * FROM users WHERE username = '${decoded.username}'`);
        if (!userData) {
            return res.status(400).send('Invalid user!!');
        }
        req.username = { username: decoded.username };
        next();
    } catch (error) {
        console.log('auth Execption', error);
        return res.status(400).send(error);
    }
}

module.exports = checkToken;