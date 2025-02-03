const express = require("express");
const router = express.Router();
const bu = require("../controllers/buController");
const absen = require("../controllers/absenController");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({
  dest: "absen/", // Directory to save uploaded files
});
router.post("/getToken", bu.getToken);
router.use(auth);
router.get("/checkBu", bu.checkBU);
router.post("/insertAbsen", upload.single("absen"), absen.addAbsen);

module.exports = router;
