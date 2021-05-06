import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    ExclamationCircleTwoTone,
} from "@ant-design/icons";

import { Button, Block } from "../../../components";

const success = true;

const RegisterForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
    } = props;

    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа вам надо зарегистрироваться</p>
            </div>
            <Block>
                {success ? (
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <Form.Item
                            validateStatus={
                                !touched.email
                                    ? ""
                                    : errors.email
                                    ? "error"
                                    : "success"
                            }
                            hasFeedback
                            help={
                                !touched.email
                                    ? ""
                                    : errors.email
                                    ? errors.email
                                    : ""
                            }>
                            <Input
                                id="email"
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                type="email"
                                placeholder="E-mail"
                                size="large"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                        </Form.Item>
                        <Form.Item
                            validateStatus={
                                !touched.name
                                    ? ""
                                    : errors.name
                                    ? "error"
                                    : "success"
                            }
                            hasFeedback
                            help={
                                !touched.name
                                    ? ""
                                    : errors.name
                                    ? errors.name
                                    : ""
                            }>
                            <Input
                                id="name"
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                size="large"
                                placeholder="Ваше имя"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                        </Form.Item>
                        <Form.Item
                            validateStatus={
                                !touched.password
                                    ? ""
                                    : errors.password
                                    ? "error"
                                    : "success"
                            }
                            hasFeedback
                            help={
                                !touched.password
                                    ? ""
                                    : errors.password
                                    ? errors.password
                                    : ""
                            }>
                            <Input
                                id="password"
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                size="large"
                                placeholder="Пароль"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </Form.Item>
                        <Form.Item
                            validateStatus={
                                !touched.password2
                                    ? ""
                                    : errors.password2
                                    ? "error"
                                    : "success"
                            }
                            hasFeedback
                            help={
                                !touched.password2
                                    ? ""
                                    : errors.password2
                                    ? errors.password2
                                    : ""
                            }>
                            <Input
                                id="password2"
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                size="large"
                                placeholder="Повторите пароль"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password2}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={handleSubmit}
                                type="primary"
                                size="large"
                                htmlType="submit"
                                className="login-form-button">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Form.Item className="auth__register-link">
                            Уже есть аккаунт? <Link to="/signin">Войти!</Link>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="auth__success-block">
                        <div>
                            <ExclamationCircleTwoTone />
                        </div>
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>
                            На вашу почту отправлено письмо со ссылкой на
                            подтверждение аккаунта.
                        </p>
                    </div>
                )}
            </Block>
        </div>
    );
};

export default RegisterForm;
