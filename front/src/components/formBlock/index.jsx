import React from "react";
import classNames from "classnames";

import "./formBlock.scss";

const Block = ({ children, className }) => (
    <div className={classNames("block", className)}>{children}</div>
);

export default Block;
