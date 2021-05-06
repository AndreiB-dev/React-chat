import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";

const ReadedIcon = ({ isMe, isReaded }) =>
    (isMe &&
        (isReaded ? (
            <CheckOutlined className="message__icon-readed" />
        ) : null)) ||
    null;

ReadedIcon.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
};

export default ReadedIcon;
