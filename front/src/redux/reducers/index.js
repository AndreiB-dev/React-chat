import { combineReducers } from "redux";

import { default as dialogs } from "./dialogs";
import { default as messages } from "./messages";
import { default as users } from "./users";
import { default as attachment } from "./attachment";

export default combineReducers({
    dialogs,
    messages,
    users,
    attachment,
});
