const db = require("../../db/");

function socketApi(io) {
    io.on("connection", function (socket) {
        console.log("A user connected");
        socket.on("DIALOGS:JOIN", (dialogId) => {
            socket.dialogId = dialogId;
            socket.join(dialogId);
        });
        socket.on("DIALOGS:TYPING", async (obj) => {
            let partner = await db.query(`
            SELECT
            chat.users.user_id,
            chat.users.name,
            chat.users.avatar,
            chat.users.confirm_hash
            FROM chat.dialogs 
            LEFT JOIN chat.users 
            ON (chat.dialogs.author = chat.users.user_id AND chat.users.user_id = '${obj.user.user_id}') 
            OR (chat.dialogs.partner = chat.users.user_id AND chat.users.user_id = '${obj.user.user_id}')
            WHERE chat.dialogs.dialog_id = '${obj.dialogId}'
            `);
            socket.broadcast.emit("DIALOGS:TYPING", partner.rows[0]);
        });
    });
}

module.exports = socketApi;
