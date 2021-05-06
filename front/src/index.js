import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { usersActions } from "./redux/actions/";

import store from "./redux/store";

import "./styles/index.scss";
import "emoji-mart/css/emoji-mart.css";

store.dispatch(usersActions.fetchUserData());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
