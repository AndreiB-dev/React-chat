var Router = require("express").Router;
const {
    createDialog,
    getDialog,
    getDialogByUserId,
    deleteDialog,
} = require("../src/controllers/dialogs");

const router = new Router();

router.post("/create", async function (req, res, next) {
    const io = req.app.locals.io;
    let dialogData = await createDialog(
        req.user.userData.user_id,
        req.body.partner,
    );
    io.emit("SERVER:DIALOG_CREATED", dialogData);
    res.json({
        dialogData,
    });
});

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    const dialogData = await getDialog(id, user);
    res.json({
        dialogData,
    });
});

router.get("/user/me", async function (req, res, next) {
    const id = req.user.userData.user_id;
    const dialogData = await getDialogByUserId(id);
    res.json({
        dialogData,
    });
});

router.get("/user/:id", async function (req, res, next) {
    const id = req.params.id;
    const dialogData = await getDialogByUserId(id);
    res.json({
        dialogData,
    });
});

router.delete("/delete/:id", async function (req, res, next) {
    const id = req.params.id;
    const dialogData = await deleteDialog(id);
    res.json({
        dialogData,
        message: "Диалог удален!",
    });
});

module.exports = router;
