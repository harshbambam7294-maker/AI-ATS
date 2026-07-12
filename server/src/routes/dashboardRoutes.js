const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { recruiterDashboard, candidateDashboard } = require("../controllers/dashboardController");

router.get(
    "/recruiter",
    protect,
    authorize("recruiter"),
    recruiterDashboard
);

router.get(
    "/candidate",
    protect,
    authorize("candidate"),
    candidateDashboard
);

module.exports = router;