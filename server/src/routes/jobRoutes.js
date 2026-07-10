const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

// Create Job
router.post(
    "/",
    protect,
    authorize("recruiter"),
    createJob
);

// Get All Jobs
router.get(
    "/",
    protect,
    authorize("recruiter"),
    getJobs
);

// Get Single Job
router.get(
    "/:id",
    protect,
    authorize("recruiter"),
    getJobById
);

// Update Job
router.put(
    "/:id",
    protect,
    authorize("recruiter"),
    updateJob
);

// Delete Job
router.delete(
    "/:id",
    protect,
    authorize("recruiter"),
    deleteJob
);

module.exports = router;