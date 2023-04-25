const express = require("express");
const router = new express.Router();
const controller = require("../controllers/doctor");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const authDoctor = require("../middleware/authDoctor");

router.post("/doctor/signup", controller.signupDoctor);
router.post("/doctor/signin", controller.loginDoctor);
router.post("/doctor/verify", controller.verifyDoctor);
router.get("/doctor/list", controller.getDoctors);
router.post("/doctor/query", controller.queryDoctors);
router.get("/doctor/details", authDoctor, controller.getDoctorDetails);
router.put("/doctor/update", authDoctor, controller.updateDoctor);

// router.get("/doctor/logout", auth, controller.logoutDoctor);

module.exports = router;
