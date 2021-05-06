const jwt = require("jsonwebtoken");
require('dotenv').config();

function createToken(userData) {
    const token = jwt.sign(
        { userData },
        process.env.JWT_SECRET || 'secret',
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: "HS256",
        }
    );
    return token;
}  
module.exports = {createToken};