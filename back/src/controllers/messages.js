const db = require("../../db");

async function getMessagesByDialogId(id, user) {
    try {
        let res = await db.query(`
        UPDATE chat.messages SET is_readed = 'true' WHERE dialog = '${id}' AND author != '${user}';
        SELECT  
        chat.messages.message_id,
        chat.messages.message_text,
        chat.messages.dialog,
        chat.messages.author,
        chat.messages.attachment,
        chat.messages.is_readed,
        chat.messages.timestamp,
        chat.users.user_id,
        chat.users.email,
        chat.users.name,
        chat.users.avatar,
        chat.users.last_seen,
        chat.users.confirm_hash
        FROM chat.messages 
        LEFT JOIN chat.users ON chat.messages.author = chat.users.user_id
        WHERE chat.messages.dialog = '${id}'
        ORDER BY chat.messages.message_id ASC;

        SELECT * FROM chat.attachments 
            WHERE attachment_id =  ANY(ARRAY(SELECT attachment 
                                             FROM chat.messages 
                                             WHERE dialog = '${id}' 
                                             AND attachment NOTNULL 
                                             AND chat.attachments.message = chat.messages.message_id ));
        `);
        if (res[1].rows.length) {
            const messageData = res[1].rows;
            const attachmentsData = res[2].rows;
            messageData.map((messageItem) => {
                messageItem.attachment = [];
                attachmentsData.map((item) => {
                    if (item.message === messageItem.message_id) {
                        messageItem.attachment.push(item);
                    }
                });
            });
            return messageData;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
        return "error";
    }
}

async function createMessage(text, dialog, user, attachments) {
    const newStamp = new Date().toISOString();
    if (attachments.length) {
        try {
            let res = await db.query(`
            INSERT INTO chat.messages (message_text, dialog, author, attachment) 
            VALUES ('${text}', '${dialog}', '${user}', '{${attachments}}');
    
            UPDATE chat.dialogs SET last_message = '${text}', timestamp = '${newStamp}' 
            WHERE dialog_id = '${dialog}'
            RETURNING *;
    
            UPDATE chat.attachments SET message = (SELECT message_id 
                                                   FROM chat.messages 
                                                   ORDER BY message_id DESC LIMIT 1) 
            WHERE attachment_id = ANY(ARRAY[${attachments}])
            RETURNING *;
    
            SELECT 
            chat.messages.message_id,
            chat.messages.message_text,
            chat.messages.dialog,
            chat.messages.author,
            chat.messages.attachment,
            chat.messages.is_readed,
            chat.messages.timestamp,
            chat.users.user_id,
            chat.users.email,
            chat.users.name,
            chat.users.avatar,
            chat.users.last_seen,
            chat.users.confirm_hash        
            FROM chat.messages 
            LEFT JOIN chat.users ON chat.messages.author = chat.users.user_id
            WHERE chat.messages.dialog = '${dialog}'
            ORDER BY chat.messages.message_id ASC;
    
            SELECT * FROM chat.attachments 
            WHERE attachment_id =  ANY(ARRAY(SELECT attachment 
                                             FROM chat.messages 
                                             WHERE dialog = '${dialog}' 
                                             AND attachment NOTNULL 
                                             AND chat.attachments.message = chat.messages.message_id ));
    
            `);
            const messageData = res[3].rows[res[3].rows.length - 1];
            const attachmentsData = res[4].rows;
            messageData.attachment = [];
            attachmentsData.map((item) => {
                if (item.message === messageData.message_id) {
                    messageData.attachment.push(item);
                }
            });

            return {
                message: messageData,
                dialog: res[1].rows,
            };
        } catch (e) {
            console.log(e);
            return "error";
        }
    } else {
        try {
            let res = await db.query(`
            INSERT INTO chat.messages (message_text, dialog, author) 
            VALUES ('${text}', '${dialog}', '${user}');
    
            UPDATE chat.dialogs SET last_message = '${text}', timestamp = '${newStamp}' 
            WHERE dialog_id = '${dialog}'
            RETURNING *;
    
            SELECT 
            chat.messages.message_id,
            chat.messages.message_text,
            chat.messages.dialog,
            chat.messages.author,
            chat.messages.attachment,
            chat.messages.is_readed,
            chat.messages.timestamp,
            chat.users.user_id,
            chat.users.email,
            chat.users.name,
            chat.users.avatar,
            chat.users.last_seen,
            chat.users.confirm_hash        
            FROM chat.messages 
            LEFT JOIN chat.users ON chat.messages.author = chat.users.user_id
            WHERE chat.messages.dialog = '${dialog}'
            ORDER BY chat.messages.message_id ASC;
            `);
            return {
                message: res[2].rows[res[2].rows.length - 1],
                dialog: res[1].rows,
            };
        } catch (e) {
            console.log(e);
            return "error";
        }
    }
}

async function deleteMessage(id, user) {
    try {
        let res = await db.query(`
        DELETE FROM chat.attachments 
        WHERE (SELECT attachment 
            FROM chat.messages 
            WHERE chat.messages.message_id = '${id}' ) IS NOT NULL 
            AND attachment_id =  ANY(ARRAY(SELECT attachment 
                                         FROM chat.messages 
                                         WHERE chat.messages.message_id = '${id}' ))
        RETURNING *; 

        DELETE FROM chat.messages WHERE message_id = '${id}' AND author = '${user}'
        RETURNING dialog;
        `);
        if (res[1].rows.length) {
            await db.query(`
            UPDATE chat.dialogs 
            SET last_message = ( SELECT message_text 
                                 FROM chat.messages 
                                 WHERE dialog = '${res[1].rows[0].dialog}' 
                                 ORDER BY message_id DESC LIMIT 1) 
            WHERE dialog_id = '${res[1].rows[0].dialog}';
            `);
        }
        return {
            message: res[1].rows,
            attachment: res[0].rows,
        };
    } catch (e) {
        return {
            error: e,
            message: "Нет доступа",
        };
    }
}

module.exports = {
    getMessagesByDialogId,
    createMessage,
    deleteMessage,
};
