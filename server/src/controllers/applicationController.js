const Application = require("../models/Application");
const Job = require("../models/Job");

// Candidate applies to a job
const applyJob = async (req, res) => {
    try {

        const { jobId } = req.params;
        const { coverLetter } = req.body;

        // Check if job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Check duplicate application
        const existingApplication = await Application.findOne({
            candidate: req.user.id,
            job: jobId,
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        const application = await Application.create({
            candidate: req.user.id,
            job: jobId,
            coverLetter,
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Candidate views all applications
const getMyApplications = async (req, res) => {
    try {

        const applications = await Application.find({
            candidate: req.user.id,
        })
        .populate({
            path: "job",
            populate: {
                path: "company",
                select: "name location",
            },
        });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Candidate withdraws application
const withdrawApplication = async (req, res) => {
    try {

        const { id } = req.params;

        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        if (application.candidate.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        await Application.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Application withdrawn successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Recruiter views all applicants for a job
const getApplicantsByJob = async (req, res) => {
    try {

        const { jobId } = req.params;

        // Check whether the job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Ensure recruiter owns this job
        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        const applications = await Application.find({
            job: jobId,
        })
        .populate("candidate", "name email resume")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Recruiter updates application status
const updateApplicationStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["pending", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const application = await Application.findById(id).populate("job");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        // Ensure recruiter owns the job
        if (application.job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


const getRecruiterApplications = async (req, res) => {

    try {

        const jobs = await Job.find({
            createdBy: req.user.id
        });

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: {
                $in: jobIds
            }
        })
        .populate("candidate", "name email resume")
        .populate("job", "title");

        return res.status(200).json({

            success: true,

            count: applications.length,

            applications

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    applyJob,
    getMyApplications,
    withdrawApplication,
    getApplicantsByJob,
    updateApplicationStatus,
    getRecruiterApplications,
};
