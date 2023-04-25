const express = require("express");
const router = new express.Router();
const controller = require("../controllers/appointment");
const path = require("path");
const mongoose = require("mongoose");
const authUser = require("../middleware/authUser");
const authDoctor = require("../middleware/authDoctor")

router.post("/appointment/new", authUser, controller.newAppointment);
router.get("/appointment/list", authUser, controller.listAppointments);
router.get("/appointment/doctor/list", authDoctor, controller.listDoctorAppointments);
router.post("/appointment/delete", authUser, controller.cancelAppointment);
router.post("/appointment/doctor/delete", authDoctor, controller.cancelDoctorAppointment);
router.post("/appointment/doctor/complete", authDoctor, controller.finishAppointment);
module.exports = router;