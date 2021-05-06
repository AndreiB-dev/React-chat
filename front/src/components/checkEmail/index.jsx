import React from "react";
import { useDispatch } from "react-redux";

import { Result } from "antd";
import { usersActions } from "../../redux/actions";

import { Block } from "..";

const CheckEmail = ({ location }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const hash = location.search.split("hash=")[1];
        if (hash) {
            dispatch(usersActions.verifyHash(hash));
        }
    });

    return (
        <div>
            <Block>
                <Result
                    status="success"
                    title="Готово!"
                    subTitle={
                        <p>
                            Регистрация прошла успешно!
                            <br />
                            Ссылка с подверждением аккаунта отправлена на ваш
                            Email.
                        </p>
                    }
                />
            </Block>
        </div>
    );
};

export default CheckEmail;
