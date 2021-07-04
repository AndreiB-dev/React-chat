import React from "react";
import { connect } from "react-redux";

import { messagesActions } from "../redux/actions";
import { socket } from "../core/";
import { MessageBlock as BaseMessages } from "../components";

const Messages = ({
    currentDialogId,
    items,
    isLoading,
    addMessage,
    fetchMessages,
    deleteMessageById,
    attachment,
}) => {
    const [inputBlockHeight, setInputBlockHeight] = React.useState(154);
    const [previewImage, setPreviewImage] = React.useState(null);
    const [isTyping, setIsTyping] = React.useState(false);
    const [partner, setPartner] = React.useState(null);
    let typingTimeoutId = null;

    const messagesRef = React.useRef(null);

    const onNewMessage = (data) => {
        addMessage(data);
    };

    React.useEffect(() => {
        socket.on("DIALOGS:TYPING", (data) => {
            setPartner(data);
            setIsTyping(true);
            clearInterval(typingTimeoutId);
            typingTimeoutId = setTimeout(() => {
                setIsTyping(false);
            }, 3000);
        });
    }, []);

    React.useEffect(() => {
        if (attachment.length) {
            setInputBlockHeight(254);
        } else {
            setInputBlockHeight(154);
        }
    }, [attachment]);

    React.useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
        socket.on("SERVER:NEW_MESSAGE", onNewMessage);

        return () => socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
    }, [currentDialogId]);

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }, [items, isTyping]);

    return (
        <BaseMessages
            blockRef={messagesRef}
            items={items}
            isLoading={isLoading}
            deleteMessage={deleteMessageById}
            inputBlockHeight={inputBlockHeight}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
            isTyping={isTyping}
            partner={partner}
        />
    );
};

export default connect(
    ({ dialogs, messages, attachment }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading,
        attachment: attachment.items,
    }),
    messagesActions,
)(Messages);
