import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

import "./status.scss";

const Status = ({ online, name, handleBack }) => {
    return (
        <div className="chat__dialog-header">
            <div />
            <div className="chat__dialog-header-center">
                <b className="chat__dialog-header-name">{name}</b>
                <div className="chat__dialog-header-status">
                    <span
                        className={classNames("status", {
                            "status--online": online,
                        })}>
                        {online ? "онлайн" : "офлайн"}
                    </span>
                </div>
            </div>
            <Button
                onClick={handleBack}
                shape="circle"
                icon={<ArrowLeftOutlined style={{ fontSize: "24px" }} />}
            />
        </div>
    );
};

Status.propTypes = {
    online: PropTypes.bool,
};

export default Status;
