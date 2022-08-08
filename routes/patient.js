const express = require("express");
const router = new express.Router();
const controller = require("../controllers/patient");
const auth = require("../middleware/authPatient");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");

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
          console.log(err);
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

router.post("/patient/signup", upload.single("image"), controller.signupPatient);

router.post("/patient/login", controller.loginPatient);

router.put(
  "/patient/update/:uid",
  auth,
  upload.single("image"),
  controller.updatePatient
);

router.get("/patient/profile", auth, controller.patientProfile);
router.put("/patient/update/:uid", auth, upload.single("image"), controller.updatePatient);

router.get("/patient/profile", auth, controller.patientProfile)

router.get("/patient/logout", auth, controller.logoutPatient);

module.exports = router;
