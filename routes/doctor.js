const express = require("express");
const router = new express.Router();
const controller = require("../controllers/doctor");
const auth = require("../middleware/authDoctor")
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose")

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const URI = `mongodb+srv://admin:${process.env.DB_PASS}@cluster01.5gpna.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

var con = mongoose.connection;
con.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(con.db, {
        bucketName: "uploads",
    });
});

const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buff) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }

                const filename = buff.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

router.post("/doctor/signup", upload.single("image"), controller.signupDoctor);

router.post("/doctor/login", controller.loginDoctor);

router.get("/doctor/profile", auth, controller.doctorProfile)

router.put("/doctor/update/:uid", auth, upload.single("image"), controller.updateDoctor);

router.get("/doctor/logout", auth, controller.logoutDoctor)



module.exports = router;