import React from "react";
import { connect } from "react-redux";

import { filesApi } from "../helpers/api";
import { socket } from "../core/";

import { messagesActions, attachmentActions } from "../redux/actions";
import { ChatInput as BaseChatInput } from "../components";

const ChatInput = (props) => {
    const {
        dialogs: { currentDialogId },
        attachment,
        fetchSendMessage,
        setAttachments,
        clearAttachments,
        deleteAttachment,
        user,
    } = props;

    window.navigator.getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia;

    const [value, setValue] = React.useState("");
    const [defaultFileList, setDefaultFileList] = React.useState([]);
    const [emojiPickerVisible, setEmojiPickerVisible] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState("");
    const [mediaRecorder, setMediaRecorder] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);

    let uploadData = [];

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop();
        } else if (value || attachment.length) {
            fetchSendMessage({
                text: value,
                dialogId: currentDialogId,
                attachments: attachment.map((file) => file.uid),
            });
            setValue("");
            clearAttachments();
        }
    };

    const handleSendMessage = (e) => {
        socket.emit("DIALOGS:TYPING", { dialogId: currentDialogId, user });
        if (e.keyCode === 13) {
            sendMessage();
        }
    };

    const addEmoji = ({ colons }) => {
        setValue((value + " " + colons).trim());
    };

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setEmojiPickerVisible(false);
        }
    };

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, onRecording, onError);
        }
    };

    const onRecording = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        };

        recorder.onstop = () => {
            setIsRecording(false);
        };

        recorder.ondataavailable = (e) => {
            const file = new File([e.data], "audio.webm");
            setLoading(true);
            filesApi.upload(file).then(({ data }) => {
                sendAudio(data.attachment_id).then(() => {
                    setLoading(false);
                });
            });
        };
    };

    const onError = (err) => {
        console.log("The following error occured: " + err);
    };

    const sendAudio = (audioId) => {
        return fetchSendMessage({
            text: "",
            dialogId: currentDialogId,
            attachments: [audioId],
        });
    };

    const handleChange = (info) => {
        setDefaultFileList(info.fileList);
    };

    const onSelectFiles = async (fileData) => {
        const uid = Math.round(Math.random() * 1000);
        uploadData = [
            ...uploadData,
            {
                uid,
                name: fileData.name,
                status: "uploading",
            },
        ];
        setAttachments(uploadData);
        await filesApi.upload(fileData.file).then((resData) => {
            uploadData = uploadData.map((item) => {
                if (item.uid === uid) {
                    return {
                        status: "done",
                        uid: resData.data.attachment_id,
                        name: resData.data.original_name,
                        url: resData.data.url,
                    };
                }
                return item;
            });
            setAttachments(uploadData);
        });
    };

    const onHideRecording = () => {
        setIsRecording(false);
    };

    React.useEffect(() => {
        const el = document.querySelector(".chat-input__smile-btn");
        document.addEventListener("click", handleOutsideClick.bind(this, el));
        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick.bind(this, el),
            );
        };
    }, []);

    if (!currentDialogId) {
        return null;
    }

    return (
        <BaseChatInput
            handleSendMessage={handleSendMessage}
            value={value}
            setValue={setValue}
            sendMessage={sendMessage}
            addEmoji={addEmoji}
            attachment={attachment}
            emojiPickerVisible={emojiPickerVisible}
            toggleEmojiPicker={toggleEmojiPicker}
            handleOutsideClick={handleOutsideClick}
            onSelectFiles={onSelectFiles}
            setDefaultFileList={setDefaultFileList}
            handleChange={handleChange}
            deleteAttachment={deleteAttachment}
            onRecord={onRecord}
            isRecording={isRecording}
            isLoading={isLoading}
            onRecording={onRecording}
            onHideRecording={onHideRecording}
        />
    );
};

export default connect(
    ({ dialogs, users, attachment }) => ({
        dialogs,
        user: users.data,
        attachment: attachment.items,
    }),
    { ...messagesActions, ...attachmentActions },
)(ChatInput);
