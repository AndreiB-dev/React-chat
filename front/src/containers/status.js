import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import isOnlineCheck from "../helpers/isOnlineCheck";
import { messagesActions } from "../redux/actions";
import { Status as BaseStatus } from "../components";

const Status = ({ currentDialogId, dialogs, setMessages }) => {
    const user = useSelector((state) => state.users.data.user_id);
    let history = useHistory();

    if (!dialogs.length || !currentDialogId) {
        return null;
    }

    const handleBack = () => {
        setMessages([]);
        history.push("/");
    };

    let partner = {};

    const currentDialog = dialogs.filter(
        (dialog) => dialog.dialog_id === currentDialogId,
    )[0];

    if (currentDialog.author === user) {
        partner = {
            name: currentDialog.partner_name,
            isOnline: isOnlineCheck(currentDialog.partner_last_seen),
        };
    } else {
        partner = {
            name: currentDialog.name,
            isOnline: isOnlineCheck(currentDialog.last_seen),
        };
    }

    return (
        <BaseStatus
            online={partner.isOnline}
            name={partner.name}
            handleBack={handleBack}
        />
    );
};

export default connect(
    ({ dialogs }) => ({
        dialogs: dialogs.items,
        currentDialogId: dialogs.currentDialogId,
    }),
    messagesActions,
)(Status);
