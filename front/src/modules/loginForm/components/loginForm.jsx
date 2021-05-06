import React from "react";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Block } from "../../../components/";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
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
                <h2>Авторизация</h2>
                <p>Пожалуйста, войдте в свой аккаунт</p>
            </div>
            <Block>
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Form.Item
                        className="auth__form-item"
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
                            style={{ height: "100%" }}
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
                    <Form.Item>
                        <Button
                            type="primary"
                            size="large"
                            className="login-form-button"
                            onClick={handleSubmit}>
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Form.Item className="auth__register-link">
                        Нет аккаунта?{" "}
                        <Link to="/signup">Зарегистрироваться!</Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    );
};

export default LoginForm;
