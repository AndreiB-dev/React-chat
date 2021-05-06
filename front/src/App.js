import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { Auth, Home } from "./pages";

function App() {
    const isAuth = useSelector((state) => state.users.isAuth);
    return (
        <div className="wrapper">
            {isAuth ? (
                <Switch>
                    <Route
                        exact
                        path={["/signin", "/signup", "/signup/check"]}
                        component={Auth}
                    />
                    <Redirect from="/signin" to="/" />
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            ) : (
                <Auth />
            )}
        </div>
    );
}

export default App;
