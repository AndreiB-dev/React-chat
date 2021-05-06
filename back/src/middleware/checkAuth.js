const { verifyToken } = require("../../jwt/verifyToken");

function checkAuth(req, res, next) {
    if (
        req.path === "/user/signin" ||
        req.path === "/user/signup" ||
        req.path === "/user/verify" ||
        req.path === "/" ||
        req.method === "OPTIONS"
    ) {
        return next();
    }
    const token = req.headers.token;

    if (token) {
        verifyToken(token)
            .then((user) => {
                req.user = user;
                next();
            })
            .catch((err) => {
                res.status(403).json({
                    message: "Invalid auth token provided",
                });
            });
    }
}

module.exports = {
    checkAuth,
};
