import { axios } from "../../core";

export default {
    getAllByDialogId: (id) => axios.get("/messages/" + id),
    send: (text, dialog, attachments) =>
        axios.post("/messages/create", {
            text,
            dialog,
            attachments,
        }),
    delete: (id) => axios.delete("/messages/delete/" + id),
};
