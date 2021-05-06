const bcrypt = require("bcrypt");

function generateHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) return reject(err);
            resolve(hash);
        });
    });
}

module.exports = {
    generateHash,
};
