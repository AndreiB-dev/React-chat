const db = require("../index");

async function createDB() {
    try {
        let res = await db.query(`
        CREATE SCHEMA chat;
        CREATE TABLE chat.users
        (
            user_id INT GENERATED ALWAYS AS IDENTITY,
            email VARCHAR(20) NOT NULL,
            name VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL,
            avatar VARCHAR,
            last_seen VARCHAR,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
        );
        CREATE TABLE chat.dialogs
        (
            dialog_id INT GENERATED ALWAYS AS IDENTITY,
            author INT,
            FOREIGN KEY (author) REFERENCES chat.users (user_id),
            partner INT,
            FOREIGN KEY (partner) REFERENCES todolist.users (user_id),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        );
        CREATE TABLE chat.messages
        (
            message_id INT GENERATED ALWAYS AS IDENTITY,
            text VARCHAR,
            dialog INT,
            FOREIGN KEY (dialog) REFERENCES chat.dialogs (dialog_id),
            user INT,
            FOREIGN KEY (user) REFERENCES chat.users (user_id),
            attachment INT,
            FOREIGN KEY (attachment) REFERENCES chat.attachments (attachment_id),
            is_readed BOOLEAN,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        );
        CREATE TABLE chat.attachments
        (
            attachment_id INT GENERATED ALWAYS AS IDENTITY,
            original_name VARCHAR,
            filename VARCHAR,
            size INT,
            url VARCHAR,
            message INT,
            FOREIGN KEY (message) REFERENCES chat.messages (message_id),
            user INT,
            FOREIGN KEY (user) REFERENCES chat.users (user_id),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        );
        `);

        return res;
    } catch (err) {
        console.log(err);
    }
}

createDB();
