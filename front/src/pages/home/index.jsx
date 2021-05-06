import React from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Messages, ChatInput, Status, Sidebar } from "../../containers";

import { dialogsActions } from "../../redux/actions";

import "./home.scss";

const Home = (props) => {
    const dispatch = useDispatch();
    const isMe = useSelector((state) => state.users.data.user_id);
    React.useEffect(() => {
        const { pathname } = props.location;
        const dialogId = Number(pathname.split("/").pop());
        if (dialogId !== 0) {
            dispatch(dialogsActions.setCurrentDialogId(dialogId));
        } else {
            dispatch(dialogsActions.setCurrentDialogId(null));
        }
    }, [props.location.pathname]);
    return (
        <section className="home">
            <div className="chat">
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
            </div>
        </section>
    );
};

export default withRouter(Home);
