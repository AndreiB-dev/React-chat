const initialState = {
    data: null,
    token: window.localStorage.token,
    isAuth: !!window.localStorage.token,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USERS:SET_DATA":
            return {
                ...state,
                data: payload,
                isAuth: !!payload,
            };
        case "USERS:SET_IS_AUTH":
            return {
                ...state,
                isAuth: payload,
            };
        default:
            return state;
    }
};
