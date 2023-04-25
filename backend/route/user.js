const express = require("express");
const router = new express.Router();
const controller = require("../controllers/user");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const authUser = require("../middleware/authUser");

router.post("/user/signup", controller.signupUser);
router.post("/user/signin", controller.loginUser);
router.post("/user/verify", controller.verifyUser);
router.get("/user/details", authUser, controller.getUserDetails);
router.get("/user/doctorDetails/:id", authUser, controller.getDoctorDetails);
router.put("/user/update", authUser, controller.updateUser);

// router.get("/doctor/logout", auth, controller.logoutDoctor);

module.exports = router;
