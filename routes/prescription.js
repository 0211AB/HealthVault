const express = require("express");
const router = new express.Router();
const controller = require("../controllers/prescription");
const auth = require("../middleware/authDoctor")

router.post("/api/prescription/create", auth, controller.createPrescription);
router.get("/api/prescription/:pid", controller.getPrescription);
router.post("/api/prescription", controller.getPostPrescription);

module.exports = router;