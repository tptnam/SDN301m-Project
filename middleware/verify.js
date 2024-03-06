const jwt = require('jsonwebtoken');
const Token = require('../database/Schemas/Token');
const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

        // req.id = decoded.id
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
};

module.exports = verifyToken;
