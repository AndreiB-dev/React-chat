import { filesApi } from "../../helpers/api";

const actions = {
    setAttachments: (items) => ({
        type: "ATTACHMENT:SET_ITEMS",
        payload: items,
    }),

    removeAttachment: (file) => ({
        type: "ATTACHMENT:REMOVE_ITEM",
        payload: file,
    }),

    clearAttachments: () => ({
        type: "ATTACHMENT:CLEAR",
        payload: [],
    }),

    deleteAttachment: (file) => (dispatch) => {
        dispatch(actions.removeAttachment(file));
        filesApi.delete(file.uid);
    },
};

export default actions;
