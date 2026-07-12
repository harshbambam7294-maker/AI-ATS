const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const { generateMatch, getRankings, generateResumeReview, generateInterviewQuestions } = require("../controllers/aiController");


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

    "/interview",

    protect,

    authorize("recruiter"),

    generateInterviewQuestions

);

module.exports = router;