const initialState = {
    items: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "ATTACHMENT:SET_ITEMS":
            return {
                ...state,
                items: payload,
            };
        case "ATTACHMENT:REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.uid !== payload.uid),
            };
        case "ATTACHMENT:CLEAR":
            return {
                ...state,
                items: payload,
            };
        default:
            return state;
    }
};
