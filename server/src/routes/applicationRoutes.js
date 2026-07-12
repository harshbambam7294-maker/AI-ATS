const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    applyJob,
    getMyApplications,
    withdrawApplication,
    getApplicantsByJob,
    updateApplicationStatus,
    getRecruiterApplications,
} = require("../controllers/applicationController");

// Apply for a job
router.post(
    "/apply/:jobId",
    protect,
    authorize("candidate"),
    applyJob
);

// View my applications
router.get(
    "/my",
    protect,
    authorize("candidate"),
    getMyApplications
);

// Withdraw application
router.delete(
    "/:id",
    protect,
    authorize("candidate"),
    withdrawApplication
);

router.get(
    "/",
    protect,
    authorize("recruiter"),
    getRecruiterApplications
);

// Recruiter views applicants of a job
router.get(
    "/job/:jobId",
    protect,
    authorize("recruiter"),
    getApplicantsByJob
);

// Recruiter updates application status
router.put(
    "/:id/status",
    protect,
    authorize("recruiter"),
    updateApplicationStatus
);

module.exports = router;