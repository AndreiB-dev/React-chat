const db = require("../../db/");

function updateLastSeen(req, res, next) {
    if (!req.user) {
        return next();
    }
    const id = req.user.userData.user_id;
    const lastSeen = new Date().toISOString();
    let result = db.query(`
        UPDATE chat.users SET last_seen = '${lastSeen}' WHERE user_id = '${id}'
        `);
    next();
}

module.exports = {
    updateLastSeen,
};
