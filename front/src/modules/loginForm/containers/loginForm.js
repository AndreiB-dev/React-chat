import { withFormik } from "formik";

import LoginForm from "../components/loginForm";
import { usersActions } from "../../../redux/actions";

import store from "../../../redux/store";

const LoginFormContainer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    validate: (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Обязательное поле";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Неверный email адрес";
        }

        if (!values.password) {
            errors.password = "Введите пароль";
        }
        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(usersActions.fetchUserLogin(values))
            .then((data) => {
                if (!data.error) {
                    props.history.push("/");
                }
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            });
    },

    displayName: "LoginForm",
})(LoginForm);

export default LoginFormContainer;
