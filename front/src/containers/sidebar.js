import React from "react";
import { connect } from "react-redux";
import { notification } from "antd";

import { usersApi, dialogsApi, filesApi } from "../helpers/api";
import { usersActions } from "../redux/actions";
import { Sidebar as BaseSidebar } from "../components";

const Sidebar = ({ user, setIsAuth, setUser }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState([]);
    const [isModal2Visible, setIsModal2Visible] = React.useState(false);
    const [username, setUsername] = React.useState(user.name);
    const [avatarUrl, setAvatarUrl] = React.useState(user.avatar);
    const [usersList, setUsersList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [partnerId, setPartnerId] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setInputValue([]);
    };

    const showModal2 = () => {
        setIsModal2Visible(true);
    };

    const closeModal2 = () => {
        setIsModal2Visible(false);
    };

    const handleChangeAvatar = async (fileData) => {
        setIsLoading(true);
        if ((fileData.file.status = "done")) {
            await filesApi
                .uploadAvatar(fileData.file)
                .then(({ data }) => {
                    setAvatarUrl(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    };

    const logout = () => {
        setUser(null);
        delete window.localStorage.token;
    };

    const updateUserData = () => {
        usersApi
            .update(username, avatarUrl)
            .then(({ data }) => {
                closeModal2();
                window.location.reload(false);
            })
            .catch((e) => console.log(e));
    };

    const handleChangeInput = (value) => {
        setInputValue(value);
    };

    const handleSearch = (value) => {
        setIsLoading(true);
        usersApi
            .findUser(value)
            .then(({ data }) => {
                setUsersList(data.userData);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    const onSelectUser = (userId) => {
        setPartnerId(userId);
    };

    const onCreateDialog = () => {
        setIsLoading(true);
        dialogsApi
            .create(partnerId)
            .then(({ data }) => {
                if (!data.dialogData.error) {
                    setIsLoading(false);
                    closeModal();
                } else {
                    const openNotificationWithIcon = (type) => {
                        notification[type]({
                            message: "Ошибка",
                            description: data.dialogData.message,
                        });
                    };
                    openNotificationWithIcon("error");
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));
    };

    return (
        <BaseSidebar
            showModal={showModal}
            closeModal={closeModal}
            isModalVisible={isModalVisible}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onChangeInput={handleChangeInput}
            onSearch={handleSearch}
            usersList={usersList}
            onSelectUser={onSelectUser}
            isLoading={isLoading}
            onCreateDialog={onCreateDialog}
            partnerId={partnerId}
            user={user}
            showModal2={showModal2}
            closeModal2={closeModal2}
            isModal2Visible={isModal2Visible}
            username={username}
            setUsername={setUsername}
            handleChangeAvatar={handleChangeAvatar}
            avatarUrl={avatarUrl}
            updateUserData={updateUserData}
            logout={logout}
        />
    );
};

export default connect(({ dialogs, users }) => ({
    dialogs,
    user: users.data,
}), usersActions)(Sidebar);
