const express = require("express");
const router = new express.Router();
const controller = require("../controllers/image");


router.get("/getimage/:id", controller.getImage);


module.exports = router;
