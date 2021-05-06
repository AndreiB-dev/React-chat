import React from "react";
import PropTypes from "prop-types";

import { generateAvatar } from "../../helpers";

import "./defaultAvatar.scss";

const DefaultAvatar = ({ user }) => {
    if (user.avatar) {
        return (
            <img
                className="avatar"
                src={user.avatar}
                alt={`Avatar ${user.name}`}
            />
        );
    } else {
        const { color, lightColor } = generateAvatar(user.hash);
        const nameFirstChar = user.name[0].toUpperCase();
        return (
            <div
                style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${lightColor} 96.52%)`,
                }}
                className="avatar avatar--symbol">
                {nameFirstChar}
            </div>
        );
    }
};

DefaultAvatar.propTypes = {
    className: PropTypes.string,
};

export default DefaultAvatar;
