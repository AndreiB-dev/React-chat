const db = require("../../db");

async function upload(user, file) {
    const uniqueName = Date.now() + file.original_name;
    try {
        let res = await db.query(`
        INSERT INTO chat.attachments (original_name, unique_name, ext, size, url, user_id) 
        VALUES ('${file.original_name}',
                '${uniqueName}', 
                '${file.ext}', 
                '${file.size}', 
                '${file.url}', 
                '${user}')
        RETURNING *
        `);
        return res.rows[0];
    } catch (e) {
        console.log(e);
        return "error";
    }
}

async function deleteFile(id) {
    try {
        let res = await db.query(`
        DELETE FROM chat.attachments WHERE attachment_id = '${id}'
        RETURNING *
        `);
        return res.rows[0];
    } catch (e) {
        return "error";
    }
}

module.exports = {
    upload,
    deleteFile,
};
