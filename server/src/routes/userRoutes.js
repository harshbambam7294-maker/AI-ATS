const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const { uploadResume } = require("../controllers/userController");

router.post(
    "/upload-resume",
    protect,
    upload.single("resume"),
    uploadResume
);

module.exports = router;