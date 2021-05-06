var express = require("express");
var router = express.Router();

const { createToken } = require("../jwt/createToken");
const { generateHash } = require("../src/helpers/generateHash");
const bcrypt = require("bcrypt");
const cloudinary = require("../src/core/cloudinary");
const {
    signupUser,
    signinUser,
    getUser,
    getUserByHash,
    findUser,
    changeUserData,
} = require("../src/controllers/user");

router.post("/signup", async function (req, res, next) {
    const password = await generateHash(req.body.password);
    const confirm_hash = await generateHash(new Date().toString());
    let userData = await signupUser(
        req.body.email,
        req.body.name,
        password,
        confirm_hash,
    );
    if (!userData.error) {
        const token = createToken(userData);
        res.json({
            token,
            userData,
        });
    } else if (userData.error && userData.errorCode === "23505") {
        res.json({
            error: "Ошибка авторизации",
            messege:
                "Такой email уже зарегестрирован, пожалуйста войдите в аккаунт!",
        });
    } else {
        res.json({
            error: "Что то пошло не так",
            message: "Пожалуйста попробуйте ещё раз позже",
        });
    }
});

router.post("/signin", async function (req, res, next) {
    let userData = await signinUser(req.body.email);
    if (userData.error || !userData) {
        res.json({
            error: "Ошибка авторизации",
            message: "Неверный email или пароль",
        });
    } else if (bcrypt.compareSync(req.body.password, userData.password)) {
        const token = createToken(userData);

        res.json({
            token,
            userData,
        });
    } else {
        res.json({
            error: "Ошибка авторизации",
            message: "Неверный email или пароль",
        });
    }
});

router.get("/verify", async function (req, res, next) {
    const hash = req.query.hash;
    const userData = await getUserByHash(hash);
    if (userData.error || !userData) {
        res.json({
            error: "Ошибка верификации",
            message: "Invalid hash",
        });
    } else {
        const token = createToken(userData);

        res.json({
            token,
            userData,
        });
    }
});

router.get("/me", async function (req, res, next) {
    const id = req.user.userData.user_id;
    const userData = await getUser(id);
    res.json({
        userData,
    });
});

router.get("/find/:id", async function (req, res, next) {
    const id = req.params.id;
    const userData = await getUser(id);
    res.json({
        userData,
    });
});

router.get("/search", async function (req, res, next) {
    const query = req.query.query;
    const userData = await findUser(query);
    res.json({
        userData,
    });
});

router.post("/update", async function (req, res, next) {
    const id = req.user.userData.user_id;
    const userData = await changeUserData(id, req.body.name, req.body.url);
    res.json({
        userData,
    });
});

module.exports = router;
