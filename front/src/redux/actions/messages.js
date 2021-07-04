import { messagesApi } from "../../helpers/api";

const actions = {
    setMessages: (items) => ({
        type: "MESSAGES:SET_ITEMS",
        payload: items,
    }),

    addMessage: (message) => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;

        if (currentDialogId === message.dialog[0].dialog_id) {
            dispatch({
                type: "MESSAGES:ADD_MESSAGE",
                payload: message.message,
            });
        }
    },

    fetchSendMessage:
        ({ text, dialogId, attachments }) =>
        (dispatch) => {
            return messagesApi.send(text, dialogId, attachments);
    },

    setIsLoading: (bool) => ({
        type: "MESSAGES:SET_IS_LOADING",
        payload: bool,
    }),

    fetchMessages: (dialogId) => (dispatch) => {
        dispatch(actions.setIsLoading(true));
        messagesApi
            .getAllByDialogId(dialogId)
            .then(({ data }) => {
                dispatch(actions.setMessages(data.messageData));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
            });
    },
    
    deleteMessageById: (id) => (dispatch) => {
        messagesApi
            .delete(id)
            .then(({ data }) => {
                dispatch({
                    type: "MESSAGES:DELETE_MESSAGE",
                    payload: id,
                });
            })
            .catch(() => {});
    },
};

export default actions;
