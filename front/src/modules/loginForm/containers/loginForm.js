import { withFormik } from "formik";

import LoginForm from "../components/loginForm";
import store from "../../../redux/store";

import { usersActions } from "../../../redux/actions";

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

    handleSubmit: async (values, { setSubmitting, props }) => {
        await store.dispatch(usersActions.fetchUserLogin(values));
        await props.history.push("/");
    },

    displayName: "LoginForm",
})(LoginForm);

export default LoginFormContainer;
