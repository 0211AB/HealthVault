const express = require("express");
const router = new express.Router();
const controller = require("../controllers/appointment");
const auth2 = require("../middleware/authDoctor");
const auth = require("../middleware/authPatient");

router.post("/api/appointment/create", auth, controller.createAppointment);
router.get("/api/appointments/doctor", auth2, controller.getAppointmentDoctor);
router.get("/api/appointments/patient", auth, controller.getAppointmentPatient);

module.exports = router;
