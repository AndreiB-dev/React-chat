import React from "react";
import {
    TeamOutlined,
    FormOutlined,
    SettingOutlined,
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Modal, Select, Input, Upload, message } from "antd";

import { Dialogs } from "../../containers";
import { DefaultAvatar } from "..";

const { Option } = Select;

function beforeUpload(file) {
    const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif";
    if (!isImage) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isImage && isLt2M;
}

const Sidebar = ({
    user,
    usersList,
    isModalVisible,
    inputValue,
    showModal,
    closeModal,
    onChangeInput,
    onSearch,
    onSelectUser,
    isLoading,
    onCreateDialog,
    partnerId,
    isModal2Visible,
    showModal2,
    closeModal2,
    handleChangeAvatar,
    updateUserData,
    username,
    setUsername,
    avatarUrl,
}) => {
    const options = usersList.map((user) => (
        <Option key={user.user_id}>{user.name}</Option>
    ));

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <DefaultAvatar
                    user={{
                        avatar: user.avatar,
                        hash: user.confirm_hash,
                        name: user.name,
                    }}
                />
                <p>{user.name}</p>
                <Button
                    onClick={showModal2}
                    shape="circle"
                    icon={<SettingOutlined />}
                />
            </div>
            <div className="chat__sidebar-dialogs">
                <div className="chat__sidebar-newdialog">
                    <div>
                        <TeamOutlined />
                        <span>Список диалогов</span>
                    </div>
                    <Button
                        onClick={showModal}
                        shape="circle"
                        icon={<FormOutlined />}
                    />
                </div>
                <Dialogs />
            </div>
            <Modal
                title="Начать диалог"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal}>
                        Закрыть
                    </Button>,
                    <Button
                        disabled={!partnerId}
                        key="submit"
                        type="primary"
                        loading={isLoading}
                        onClick={onCreateDialog}>
                        Создать
                    </Button>,
                ]}>
                <p>Найдите собеседника для общения</p>
                <Select
                    showSearch
                    value={inputValue}
                    placeholder="Введите имя или email пользователя"
                    style={{ width: "100%" }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={onSearch}
                    onChange={onChangeInput}
                    onSelect={onSelectUser}
                    notFoundContent={"Не найдено"}>
                    {options}
                </Select>
            </Modal>
            <Modal
                title="Данные пользователья"
                visible={isModal2Visible}
                onCancel={closeModal2}
                footer={[
                    <Button key="back" onClick={closeModal2}>
                        Закрыть
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isLoading}
                        onClick={updateUserData}>
                        Изменить
                    </Button>,
                ]}>
                <p>Имя пользователя</p>
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}></Input>
                <br />
                <br />
                <p>Аватар</p>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    multiple={false}
                    beforeUpload={beforeUpload}
                    customRequest={handleChangeAvatar}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            style={{ width: "100%" }}
                        />
                    ) : (
                        <div>
                            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
            </Modal>
        </div>
    );
};

Sidebar.defaultProps = {
    usersList: [],
};

export default Sidebar;
