const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");

const recruiterDashboard = async (req, res) => {

    try {

        const recruiterId = req.user.id;

        const totalCompanies = await Company.countDocuments({
            createdBy: recruiterId
        });

        const totalJobs = await Job.countDocuments({
            createdBy: recruiterId
        });

        const jobs = await Job.find({
            createdBy: recruiterId
        }).select("_id");

        const jobIds = jobs.map(job => job._id);

        const totalApplications = await Application.countDocuments({
            job: {
                $in: jobIds
            }
        });

        const pending = await Application.countDocuments({
            job: {
                $in: jobIds
            },
            status: "pending"
        });

        const accepted = await Application.countDocuments({
            job: {
                $in: jobIds
            },
            status: "accepted"
        });

        const rejected = await Application.countDocuments({
            job: {
                $in: jobIds
            },
            status: "rejected"
        });

        const recentJobs = await Job.find({
            createdBy: recruiterId
        })
        .populate("company", "name")
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title location employmentType createdAt company");

        const recentApplications = await Application.find({
            job: {
            $in: jobIds
            }
        })
        .populate("candidate", "name email resume")
        .populate("job", "title")
        .sort({ createdAt: -1 })
        .limit(5);

        return res.status(200).json({

            success: true,

            stats: {

                companies: totalCompanies,
                jobs: totalJobs,
                applications: totalApplications,
                pending,
                accepted,
                rejected

            },

            recentJobs,

            recentApplications

        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const User = require("../models/User");

const candidateDashboard = async (req, res) => {

    try {

        const candidateId = req.user.id;

        // Profile
        const profile = await User.findById(candidateId)
            .select("-password");

        // Total Applications
        const totalApplications = await Application.countDocuments({
            candidate: candidateId
        });

        // Pending
        const pending = await Application.countDocuments({
            candidate: candidateId,
            status: "pending"
        });

        // Accepted
        const accepted = await Application.countDocuments({
            candidate: candidateId,
            status: "accepted"
        });

        // Rejected
        const rejected = await Application.countDocuments({
            candidate: candidateId,
            status: "rejected"
        });

        // Recent Applications
        const recentApplications = await Application.find({
            candidate: candidateId
        })
        .populate({
            path: "job",
            select: "title location employmentType salary company",
            populate: {
                path: "company",
                select: "name"
            }
        })
        .sort({
            createdAt: -1
        })
        .limit(5);

        return res.status(200).json({

            success: true,

            stats: {

                applications: totalApplications,

                pending,

                accepted,

                rejected

            },

            recentApplications,

            profile

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    recruiterDashboard,

    candidateDashboard
};