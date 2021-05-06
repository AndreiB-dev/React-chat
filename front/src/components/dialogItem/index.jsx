import React from "react";
import classNames from "classnames";
import { format, isToday, parseISO } from "date-fns";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";
import { Link } from "react-router-dom";

import { DefaultAvatar } from "..";
import { isOnline } from "../../helpers";

const getDialogTime = (created_at) => {
    if (isToday(parseISO(created_at))) {
        return format(new Date(created_at), "HH:mm");
    } else {
        return format(new Date(created_at), "dd.MM.yyyy");
    }
};

const DialogItem = ({
    dialog_id,
    unread,
    isMe,
    partner_name,
    partner_last_seen,
    partner_confirm_hash,
    partner_avatar,
    name,
    last_seen,
    confirm_hash,
    avatar,
    timestamp,
    last_message,
    onSelect,
    currentDialog,
}) => {
    let partner = {};
    
    if (isMe) {
        partner = {
            name: partner_name,
            avatar: partner_avatar,
            hash: partner_confirm_hash,
            last_seen: partner_last_seen,
        };
    } else {
        partner = {
            name: name,
            avatar: avatar,
            hash: confirm_hash,
            last_seen: last_seen,
        };
    }

    return (
        <Link to={`/dialog/${dialog_id}`}>
            <div
                className={classNames("dialogs__item", {
                    "dialogs__item--online": isOnline(partner.last_seen),
                    "dialogs__item--selected": currentDialog === dialog_id,
                })}
                onClick={onSelect.bind(this, dialog_id)}>
                <div className="dialogs__item-avatar">
                    <DefaultAvatar
                        user={{
                            name: partner.name,
                            avatar: partner.avatar,
                            hash: partner.hash,
                        }}
                    />
                </div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{partner.name}</b>
                        <span>{getDialogTime(timestamp)}</span>
                    </div>
                    <div className="dialogs__item-info-bottom">
                        <p>
                            {last_message
                                ? reactStringReplace(
                                      last_message,
                                      /:(.+?):/g,
                                      (match, i) => (
                                          <Emoji
                                              key={i}
                                              emoji={match}
                                              set="apple"
                                              size={14}
                                          />
                                      ),
                                  )
                                : "Прикрепленный файл"}
                        </p>
                        {unread > 0 && (
                            <div className="dialogs__item-info-bottom-count">
                                {unread > 9 ? "9+" : unread}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DialogItem;
