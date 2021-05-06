import { withFormik } from "formik";

import RegisterForm from "../components/registerForm";
import store from "../../../redux/store";

import { usersActions } from "../../../redux/actions";

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        name: "",
        password: "",
        password2: "",
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

        if (!values.name) {
            errors.name = "Обязательное поле";
        } else if (values.name.length < 3) {
            errors.name = "Имя должно быть более 3-х символов";
        }

        if (!values.password) {
            errors.password = "Введите пароль";
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,})/i.test(
                values.password,
            )
        ) {
            errors.password = "Слишком легкий пароль";
        }

        if (!values.password2) {
            errors.password2 = "Повторите пароль";
        } else if (!(values.password === values.password2)) {
            errors.password2 = "Пароли не совпадают";
        }
        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        store.dispatch(usersActions.fetchUserRegistration(values));
        setSubmitting(false);
    },

    displayName: "RegisterForm",
})(RegisterForm);
