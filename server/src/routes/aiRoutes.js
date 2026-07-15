const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const { generateMatch, getRankings, generateResumeReview, generateInterviewQuestions, generateAIReview } = require("../controllers/aiController");


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

router.get(
    "/review",
    protect,
    authorize("candidate"),
    generateResumeReview
);

router.post(
    "/generate-review",
    protect,
    authorize("candidate"),
    generateAIReview
);

router.post(

    "/interview",

    protect,

    authorize("recruiter"),

    generateInterviewQuestions

);

module.exports = router;