var express = require("express");
var router = express.Router();

const cloudinary = require("../src/core/cloudinary");

const { upload, deleteFile } = require("../src/controllers/upload");

router.post("/upload", async function (req, res, next) {
    const user = req.user.userData.user_id;
    const file = req.file;
    cloudinary.v2.uploader
        .upload_stream({ resource_type: "auto" }, async (error, result) => {
            if (result) {
                const file = {
                    original_name: req.file.originalname,
                    ext: result.format,
                    size: result.bytes,
                    url: result.url,
                };
                const fileData = await upload(user, file);
                res.status(200).json(fileData);
            } else {
                res.status(500).json(error);
            }
        })
        .end(file.buffer);
});

router.post("/uploadavatar", async function (req, res, next) {
    const file = req.file;
    cloudinary.v2.uploader
        .upload_stream({ resource_type: "auto" }, async (error, result) => {
            if (result) {
                res.status(200).json(result.url);
            } else {
                res.status(500).json(error);
            }
        })
        .end(file.buffer);
});

router.delete("/delete/:id", async function (req, res, next) {
    const id = req.params.id;
    const fileData = await deleteFile(id);
    const cloudinaryName = fileData.url.split("/").pop().split(".")[0];
    cloudinary.v2.uploader.destroy(cloudinaryName, function (result) {
        if (result) {
            console.log(result);
        }
    });
    res.json({
        fileData,
        message: "Фаил удален!",
    });
});

module.exports = router;
