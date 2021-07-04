import React from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

import { Messages, ChatInput, Status, Sidebar } from "../../containers";

import { dialogsActions } from "../../redux/actions";

import "./home.scss";

const Home = (props) => {
    const dispatch = useDispatch();
    const isMe = useSelector((state) => state.users.data);

    React.useEffect(() => {
        const { pathname } = props.location;
        const dialogId = Number(pathname.split("/").pop());
        dispatch(dialogsActions.setCurrentDialogId(dialogId));
    }, [props.location.pathname]);

    return (
        <section className="home">
            <div className="chat">
                {isMe ? (
                    <>
                        <Sidebar />
                        {isMe && (
                            <div className="chat__dialog">
                                <Status />
                                <Messages />
                                <div className="chat__dialog-input">
                                    <ChatInput />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="chat__loading">
                        <Spin size="large" tip="Загрузка..." />
                    </div>
                )}
            </div>
        </section>
    );
};

export default withRouter(Home);
