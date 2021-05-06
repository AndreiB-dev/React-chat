import { usersApi } from "../../helpers/api";
import { notification } from "antd";

const actions = {
    setUser: (data) => ({
        type: "USERS:SET_DATA",
        payload: data,
    }),
    setIsAuth: (bool) => ({
        type: "USER:SET_IS_AUTH",
        payload: bool,
    }),
    fetchUserLogin: (postData) => (dispatch) => {
        usersApi
            .signin(postData)
            .then(({ data }) => {
                if (data.error) {
                    const openNotificationWithIcon = (type) => {
                        notification[type]({
                            message: data.error,
                            description: data.message,
                        });
                    };
                    openNotificationWithIcon("error");
                } else {
                    const openNotificationWithIcon = (type) => {
                        notification[type]({
                            message: "Успех!",
                            description: "Добро пожаловать!",
                        });
                    };
                    openNotificationWithIcon("success");
                    window.localStorage["token"] = data.token;
                    dispatch(actions.setUser(data.userData));
                    dispatch(actions.setIsAuth(true));
                }
                return data;
            })
            .catch((e) => {
                console.log("login error", e);
                const openNotificationWithIcon = (type) => {
                    notification[type]({
                        message: "Что то пошло не нак",
                        description: "Попробуйте ещё раз позже",
                    });
                };
                openNotificationWithIcon("error");
                dispatch(actions.setIsAuth(false));
            });
    },
    fetchUserData: () => (dispatch) => {
        usersApi
            .getMe()
            .then(({ data }) => {
                dispatch(actions.setUser(data.userData));
            })
            .catch((err) => {
                console.log("useract err", err);
                if (err.response.status === 403) {
                    dispatch(actions.setIsAuth(false));
                    delete window.localStorage.token;
                }
            });
    },
    fetchUserRegistration: (postData) => (dispatch) => {
        usersApi
            .signup(postData)
            .then(({ data }) => {
                if (data.error) {
                    const openNotificationWithIcon = (type) => {
                        notification[type]({
                            message: data.error,
                            description: data.message,
                        });
                    };
                    openNotificationWithIcon("error");
                } else {
                    const openNotificationWithIcon = (type) => {
                        notification[type]({
                            message: "Успех!",
                            description: "Добро пожаловать!",
                        });
                    };
                    openNotificationWithIcon("success");
                    window.localStorage["token"] = data.token;
                    dispatch(actions.setUser(data.userData[0]));
                    dispatch(actions.setIsAuth(true));
                }
            })
            .catch((e) => {
                const openNotificationWithIcon = (type) => {
                    notification[type]({
                        message: "Что то пошло не нак",
                        description: "Попробуйте ещё раз позже",
                    });
                };
                openNotificationWithIcon("error");
            });
    },
    verifyHash: (hash) => (dispatch) => {
        usersApi
            .verify(hash)
            .then(({ data }) => {
                if (data.error) {
                    const openNotificationWithIcon = (type) => {
                        notification[type]({
                            message: data.error,
                            description: data.message,
                        });
                    };
                    openNotificationWithIcon("error");
                } else {
                    window.localStorage["token"] = data.token;
                    dispatch(actions.setUser(data.userData[0]));
                    dispatch(actions.setIsAuth(true));
                }
                return data;
            })
            .catch((e) => {
                console.log("error", e);
            });
    },
};

export default actions;
