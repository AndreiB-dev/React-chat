import React from "react";
import {
    TeamOutlined,
    SettingOutlined,
    LoadingOutlined,
    PlusOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Button, Modal, Select, Input, Upload, message } from "antd";

import { Dialogs } from "../../containers";
import { DefaultAvatar } from "..";

import { ReactComponent as LogoutSvg } from "../../assets/img/logout.svg";

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
    logout,
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
                <div>
                    <Button
                        onClick={showModal2}
                        shape="circle"
                        icon={<SettingOutlined style={{ fontSize: "20px" }} />}
                    />
                    <Button
                        className="chat__sidebar-exit-btn"
                        onClick={logout}
                        shape="circle"
                        icon={
                            <Icon
                                component={LogoutSvg}
                                style={{ fontSize: "24px" }}
                            />
                        }
                    />
                </div>
            </div>
            <div className="chat__sidebar-dialogs">
                <div className="chat__sidebar-newdialog">
                    <div>
                        <TeamOutlined />
                        <span>???????????? ????????????????</span>
                    </div>
                    <Button
                        onClick={showModal}
                        shape="circle"
                        icon={<MessageOutlined style={{ fontSize: "24px" }} />}
                    />
                </div>
                <Dialogs />
            </div>
            <Modal
                title="???????????? ????????????"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal}>
                        ??????????????
                    </Button>,
                    <Button
                        disabled={!partnerId}
                        key="submit"
                        type="primary"
                        loading={isLoading}
                        onClick={onCreateDialog}>
                        ??????????????
                    </Button>,
                ]}>
                <p>?????????????? ?????????????????????? ?????? ??????????????</p>
                <Select
                    showSearch
                    value={inputValue}
                    placeholder="?????????????? ?????? ?????? email ????????????????????????"
                    style={{ width: "100%" }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={onSearch}
                    onChange={onChangeInput}
                    onSelect={onSelectUser}
                    notFoundContent={"???? ??????????????"}>
                    {options}
                </Select>
            </Modal>
            <Modal
                title="???????????? ??????????????????????????"
                visible={isModal2Visible}
                onCancel={closeModal2}
                footer={[
                    <Button key="back" onClick={closeModal2}>
                        ??????????????
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isLoading}
                        onClick={updateUserData}>
                        ????????????????
                    </Button>,
                ]}>
                <p>?????? ????????????????????????</p>
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}></Input>
                <br />
                <br />
                <p>????????????</p>
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
