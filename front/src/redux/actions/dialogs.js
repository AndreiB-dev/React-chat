import { socket } from "../../core";
import { dialogsApi } from "../../helpers/api";

const actions = {
    setDialogs: (items) => ({
        type: "DIALOGS:SET_ITEMS",
        payload: items,
    }),

    setCurrentDialogId: (id) => (dispatch) => {
        socket.emit("DIALOGS:JOIN", id);
        dispatch({
            type: "DIALOGS:SET_CURRENT_DIALOG_ID",
            payload: id,
        });
    },

    fetchDialogs: () => (dispatch) => {
        dialogsApi
            .getAll()
            .then(({ data }) => {
                if (!data.dialogData.error) {
                    dispatch(actions.setDialogs(data.dialogData));
                } else {
                    dispatch(actions.setDialogs([]));
                }
            })
            .catch((err) => console.log("dilog error", err));
    },
};

export default actions;
