const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
            if (err || !decodedData) {
                return reject(err);
            }
            return resolve(decodedData);
        })
    });
}  
module.exports = {verifyToken};