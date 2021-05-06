import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
    SmileOutlined,
    CameraOutlined,
    AudioOutlined,
    SendOutlined,
    CloseOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Input, Button, Upload, message } from "antd";
import { Picker } from "emoji-mart";

import { UploadFiles } from "..";

import "./chatInput.scss";

const { TextArea } = Input;

const ChatInput = (props) => {
    const {
        emojiPickerVisible,
        toggleEmojiPicker,
        value,
        setValue,
        addEmoji,
        handleSendMessage,
        sendMessage,
        attachment,
        onSelectFiles,
        handleChange,
        defaultFileList,
        isRecording,
        onRecord,
        onHideRecording,
        deleteAttachment,
        isLoading,
    } = props;

    const beforeUpload = (file) => {
        const isImage =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/gif";
        if (!isImage) {
            message.error("Вы можете загрузить только изображения.");
        }
        return isImage;
    };

    return (
        <Fragment>
            <div className="chat-input">
                <div>
                    <div className="chat-input__smile-btn">
                        {emojiPickerVisible && (
                            <div className="chat-input__emoji-picker">
                                <Picker
                                    title="Pick your emoji…"
                                    set="apple"
                                    onSelect={(emojiTag) => addEmoji(emojiTag)}
                                />
                            </div>
                        )}
                        <Button
                            onClick={toggleEmojiPicker}
                            shape="circle"
                            icon={<SmileOutlined />}
                        />
                    </div>
                    {isRecording ? (
                        <div className="chat-input__record-status">
                            <i className="chat-input__record-status-bubble"></i>
                            Recording...
                            <Button
                                onClick={onHideRecording}
                                shape="circle"
                                icon={
                                    <CloseOutlined
                                        style={{ fontSize: "15px" }}
                                    />
                                }
                                className="stop-recording"
                            />
                        </div>
                    ) : (
                        <TextArea
                            placeholder="Введите текст сообщения"
                            size="large"
                            onChange={(e) => setValue(e.target.value)}
                            onKeyUp={handleSendMessage}
                            value={value}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                        />
                    )}
                    <div className="chat-input__actions">
                        {isLoading ? (
                            <LoadingOutlined style={{ color: "#3674ff" }} />
                        ) : isRecording || value || attachment.length ? (
                            <Button
                                onClick={sendMessage}
                                shape="circle"
                                icon={
                                    <SendOutlined
                                        style={{ color: "#3674ff" }}
                                    />
                                }
                            />
                        ) : (
                            <div className="chat-input__record-btn">
                                <Button
                                    onClick={onRecord}
                                    shape="circle"
                                    icon={<AudioOutlined />}
                                />
                            </div>
                        )}
                        <Upload
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            multiple={true}
                            onChange={handleChange}
                            defaultFileList={defaultFileList}
                            customRequest={onSelectFiles}>
                            <Button shape="circle" icon={<CameraOutlined />} />
                        </Upload>
                    </div>
                </div>
                <div className="chat-input__attachment">
                    <UploadFiles
                        attachment={attachment}
                        deleteAttachment={deleteAttachment}
                    />
                </div>
            </div>
        </Fragment>
    );
};

ChatInput.propTypes = {
    className: PropTypes.string,
};

export default ChatInput;
