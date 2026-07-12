const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
    uploadResume,
    getProfile
} = require("../controllers/userController");

router.post(
    "/upload-resume",
    protect,
    authorize("candidate"),
    upload.single("resume"),
    uploadResume
);

router.get(
    "/profile",
    protect,
    getProfile
);

module.exports = router;