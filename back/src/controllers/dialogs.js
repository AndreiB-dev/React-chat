const db = require("../../db");

async function createDialog(author, partner) {
    const lastMessage = "Начните диалог!";
    try {
        let check = await db.query(`
        SELECT * FROM chat.dialogs 
        WHERE (author = '${author}' AND partner = '${partner}') OR (author = '${partner}' AND partner = '${author}')
        `);
        if (!check.rows.length) {
            let res = await db.query(`
            INSERT INTO chat.dialogs (author, partner, last_message) 
            VALUES ('${author}', '${partner}', '${lastMessage}')
            RETURNING dialog_id, author, partner, last_message
            `);
            return res.rows[0];
        } else {
            return {
                error: "error",
                message: "Такой диалог уже существует",
            };
        }
    } catch (err) {
        return {
            error: "error",
            message: err,
        };
    }
}

async function deleteDialog(id) {
    try {
        let res = await db.query(`
        DELETE FROM chat.dialogs WHERE dialog_id = '${id}'
        RETURNING dialog_id
        `);
        return res.rows[0].dialog_id;
    } catch (e) {
        return "error";
    }
}

async function getDialog(id) {
    try {
        let res = await db.query(`
        SELECT * FROM chat.dialogs, chat.messages WHERE dialog_id = '${id}'
        `);
        if (res.rows.length) {
            return res.rows;
        } else {
            return "error";
        }
    } catch (e) {
        return "error";
    }
}

async function getDialogByUserId(id) {
    try {
        let res = await db.query(`
        SELECT
        chat.dialogs.dialog_id,
        chat.dialogs.author,
        chat.dialogs.partner,
        chat.dialogs.last_message,
        chat.dialogs.timestamp,
        chat.users.user_id,
        chat.users.email,
        chat.users.name,
        chat.users.avatar,
        chat.users.last_seen,
        chat.users.confirm,
        chat.users.confirm_hash,
        partner.user_id AS partner_id,
        partner.email AS partner_email,
        partner.name AS partner_name,
        partner.avatar AS partner_avatar,
        partner.last_seen AS partner_last_seen,
        partner.confirm AS partner_confirm,
        partner.confirm_hash AS partner_confirm_hash
        FROM chat.dialogs 
        LEFT JOIN chat.users ON chat.dialogs.author = chat.users.user_id
        LEFT JOIN chat.users AS partner ON chat.dialogs.partner = partner.user_id
        WHERE chat.dialogs.author = '${id}' OR chat.dialogs.partner = '${id}'
        `);
        if (res.rows.length) {
            return res.rows;
        } else {
            return {
                error: "Error",
                message: "Нет диалогов",
            };
        }
    } catch (e) {
        return "error";
    }
}

module.exports = {
    createDialog,
    deleteDialog,
    getDialog,
    getDialogByUserId,
};
