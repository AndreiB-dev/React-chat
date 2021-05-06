import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginForm from "../../modules/loginForm";
import RegisterForm from "../../modules/registerForm";
import CheckEmail from "../../components/checkEmail";

import "./auth.scss";

const Auth = () => {
    return (
        <section className="auth">
            <div className="auth__content">
                <Switch>
                    <Route exact path="/signin" component={LoginForm} />
                    <Route exact path="/signup" component={RegisterForm} />
                    <Route exact path="/signup/check" component={CheckEmail} />
                </Switch>
            </div>
        </section>
    );
};

export default Auth;
