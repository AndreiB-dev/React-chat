import React from "react";
import { connect } from "react-redux";

import { socket } from "../core/";
import { dialogsActions } from "../redux/actions";
import { Dialogs as BaseDialogs } from "../components";

const Dialogs = ({
    setCurrentDialogId,
    currentDialogId,
    items,
    userId,
    fetchDialogs,
}) => {
    const [inputValue, setInputValue] = React.useState("");
    const [filtred, setFiltred] = React.useState(items);

    const onChangeInput = (value = "") => {
        setFiltred(
            items.filter(
                (dialog) =>
                    dialog.partner_name
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) >= 0 ||
                    dialog.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            ),
        );
        setInputValue(value);
    };

    React.useEffect(() => {
        if (items.length) {
            onChangeInput();
        }
    }, [items]);

    React.useEffect(() => {
        fetchDialogs();

        socket.on("SERVER:DIALOG_CREATED", fetchDialogs);
        socket.on("SERVER:NEW_MESSAGE", fetchDialogs);

        return () => {
            socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs);
            socket.removeListener("SERVER:NEW_MESSAGE", fetchDialogs);
        };
    }, []);

    return (
        <BaseDialogs
            userId={userId}
            items={filtred}
            onSearch={onChangeInput}
            inputValue={inputValue}
            onSelectDialog={setCurrentDialogId}
            currentDialogId={currentDialogId}
        />
    );
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
