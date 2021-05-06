import React from "react";
import { useSelector } from "react-redux";
import orderBy from "lodash/orderBy";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Empty } from "antd";

import { DialogItem } from "..";

import "./dialogs.scss";

const Dialogs = ({
    items,
    onSearch,
    inputValue,
    currentDialogId,
    onSelectDialog,
}) => {
    const isMe = useSelector((state) => state.users.data.user_id);

    return (
        <div className="dialogs">
            <div className="dialogs__search">
                <Input
                    placeholder="поиск среди контактов"
                    suffix={<SearchOutlined />}
                    value={inputValue}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            {items ? (
                orderBy(items, ["timestamp"], ["desc"]).map((item) => (
                    <DialogItem
                        onSelect={onSelectDialog}
                        key={item.dialog_id}
                        isMe={item.author === isMe}
                        currentDialog={currentDialogId}
                        {...item}
                    />
                ))
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Ничего не найдено"
                />
            )}
        </div>
    );
};

export default Dialogs;
