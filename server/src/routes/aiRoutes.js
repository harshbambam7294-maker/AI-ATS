const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const { generateMatch, getRankings, generateResumeReview } = require("../controllers/aiController");

router.post(
    "/match",
    protect,
    authorize("recruiter"),
    generateMatch
);

router.get(
    "/rank/:jobId",
    protect,
    authorize("recruiter"),
    getRankings
);

router.post(
    "/review/:candidateId",
    protect,
    generateResumeReview
);

module.exports = router;