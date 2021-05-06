import { notification } from "antd";

export default ({ text, type = "info", title }) => {
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: title,
            description: text,
        });
    };
};
