const db = require("../../db/");

async function signupUser(email, name, password, confirm_hash) {
    try {
        const last_seen = new Date().toISOString();
        let res = await db.query(`
        INSERT INTO chat.users (email, name, password, last_seen, confirm_hash) 
        VALUES ('${email}', '${name}', '${password}', '${last_seen}', '${confirm_hash}')
        RETURNING user_id, email, name, avatar, last_seen, confirm, confirm_hash
        `);
        return res.rows[0];
    } catch (e) {
        return {
            error: "Error",
            errorCode: e.code,
        };
    }
}

async function signinUser(email) {
    try {
        let res = await db.query(`
        SELECT user_id, email, name, password, avatar, last_seen, confirm, confirm_hash 
        FROM chat.users 
        WHERE email = '${email}'
        `);
        if (res.rows.length) {
            return res.rows[0];
        } else {
            return {
                error: "Error",
                errorCode: "Пользователь не найден",
            };
        }
    } catch (e) {
        return "error";
    }
}

async function getUser(id) {
    try {
        let res = await db.query(`
        SELECT user_id, email, name, avatar, last_seen, confirm, confirm_hash 
        FROM chat.users 
        WHERE user_id = '${id}'
        `);
        if (res.rows.length) {
            return res.rows[0];
        } else {
            return {
                error: "Error",
                errorCode: "Пользователь не найден",
            };
        }
    } catch (e) {
        return "error";
    }
}

async function getUserByHash(hash) {
    try {
        let res = await db.query(`
        UPDATE chat.users SET confirm = 'true' 
        WHERE confirm_hash = '${hash}'
        RETURNING user_id, email, name, avatar, last_seen, confirm, confirm_hash;
        SELECT user_id, email, name, avatar, last_seen, confirm, confirm_hash 
        FROM chat.users 
        WHERE confirm_hash = '${hash}'
        
        `);
        if (res[0].rows.length) {
            return res[0].rows;
        } else {
            return {
                error: "Error",
                errorCode: "Invalid hash",
            };
        }
    } catch (e) {
        console.log(e);
        return "error";
    }
}

async function findUser(text) {
    try {
        let res = await db.query(`
        SELECT user_id, email, name, avatar, last_seen, confirm, confirm_hash 
        FROM chat.users 
        WHERE name ILIKE '%${text}%' OR email ILIKE '%${text}%'
        `);
        if (res.rows.length) {
            return res.rows;
        } else {
            return [];
        }
    } catch (e) {
        return "error";
    }
}

async function changeUserData(id, name, url) {
    try {
        let res = await db.query(`
        UPDATE chat.users SET name = '${name}', avatar = '${url}' 
        WHERE user_id = '${id}'
        `);
        return res.rows;
    } catch (e) {
        return "error";
    }
}

module.exports = {
    signupUser,
    signinUser,
    getUser,
    getUserByHash,
    findUser,
    changeUserData,
};
