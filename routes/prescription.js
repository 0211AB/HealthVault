const express = require("express");
const router = new express.Router();
const controller = require("../controllers/prescription");
const auth = require("../middleware/authDoctor");

router.post("/prescription/create", auth, controller.createPrescription);
router.get("/prescription/:pid", controller.getPrescription);
router.post("/prescription", controller.getPostPrescription);

module.exports = router;
