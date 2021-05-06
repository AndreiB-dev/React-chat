var Router = require("express").Router;
const {
    getMessagesByDialogId,
    createMessage,
    deleteMessage,
} = require("../src/controllers/messages");

const cloudinary = require("../src/core/cloudinary");

const router = new Router();

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    const user = req.user.userData.user_id;
    const messageData = await getMessagesByDialogId(id, user);
    res.json({
        messageData,
    });
});

router.post("/create", async function (req, res, next) {
    const io = req.app.locals.io;
    const user = req.user.userData.user_id;
    let messageData = await createMessage(
        req.body.text,
        req.body.dialog,
        user,
        req.body.attachments,
    );
    if (messageData !== "error") {
        io.emit("SERVER:NEW_MESSAGE", messageData);

        res.json({
            messageData,
        });
    } else {
        res.json({
            messageData,
        });
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    const id = req.params.id;
    const user = req.user.userData.user_id;

    const messageData = await deleteMessage(id, user);
    if (messageData.attachment.length) {
        messageData.attachment.map((item) => {
            let cloudinaryName = item.url.split("/").pop().split(".")[0];
            if (item.ext === "webm") {
                cloudinary.v2.uploader.destroy(
                    cloudinaryName,
                    { resource_type: "video" },
                    function (result) {
                        if (result) {
                            console.log(result);
                        }
                    },
                );
            } else {
                cloudinary.v2.uploader.destroy(
                    cloudinaryName,
                    function (result) {
                        if (result) {
                            console.log(result);
                        }
                    },
                );
            }
        });
    }
    res.json({
        messageData: messageData,
        message: "Сообщение удалено!",
    });
});

module.exports = router;
