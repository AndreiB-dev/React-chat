import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Empty, Spin, Modal } from "antd";
import classNames from "classnames";

import { Message } from "..";

import "./messageBlock.scss";

const MessageBlock = ({
    blockRef,
    isLoading,
    items,
    deleteMessage,
    inputBlockHeight,
    previewImage,
    setPreviewImage,
    isTyping,
    partner,
}) => {
    const isMe = useSelector((state) => state.users.data.user_id);
    const currentDialogId = useSelector(
        (state) => state.dialogs.currentDialogId,
    );

    return (
        <div
            className="chat__dialog-messages"
            style={{ height: `calc(100% - ${inputBlockHeight}px)` }}>
            <div
                ref={blockRef}
                className={classNames("messages", {
                    "messages--loading": isLoading,
                })}>
                {isLoading ? (
                    <Spin size="large" tip="Загрузка сообщений..." />
                ) : items && items !== "error" && !isLoading ? (
                    items.length > 0 ? (
                        items.map((item) => (
                            <Message
                                key={item.message_id}
                                isMe={item.author === isMe}
                                {...item}
                                setPreviewImage={setPreviewImage}
                                deleteMessage={deleteMessage.bind(
                                    this,
                                    item.message_id,
                                )}
                            />
                        ))
                    ) : currentDialogId ? (
                        <Empty description="Нет сообщений" />
                    ) : (
                        <Empty description="Начните диалог" />
                    )
                ) : (
                    <Empty description="Нет сообщений" />
                )}
                {isTyping && <Message isTyping={true} {...partner} />}
                <Modal
                    visible={!!previewImage}
                    onCancel={() => setPreviewImage(null)}
                    footer={null}>
                    <img
                        src={previewImage}
                        style={{ width: "100%" }}
                        alt="Preview"
                    />
                </Modal>
            </div>
        </div>
    );
};

MessageBlock.propTypes = {
    items: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default MessageBlock;
