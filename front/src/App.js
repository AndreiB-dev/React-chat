import React from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import { useSelector } from "react-redux";

import { Auth, Home } from "./pages";

function App() {
    const isAuth = useSelector((state) => state.users.isAuth);
    return (
        <div className="wrapper">
            <Switch>
                <Route
                    exact
                    path={["/signin", "/signup", "/signup/verify"]}
                    component={Auth}
                />
                <Route
                    path="/"
                    render={() =>
                        isAuth ? <Home /> : <Redirect to="/signin" />
                    }
                />
            </Switch>
        </div>
    );
}

export default (App);
