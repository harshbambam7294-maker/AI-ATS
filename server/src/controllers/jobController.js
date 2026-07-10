const Job = require("../models/Job");
const Company = require("../models/Company");

const createJob = async (req, res) => {

    try {

        const {
            title,
            description,
            requirements,
            salary,
            location,
            experience,
            employmentType,
            companyId,
        } = req.body;

        if (
            !title ||
            !description ||
            !location ||
            !companyId
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        if (company.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            experience,
            employmentType,
            company: companyId,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const getJobs = async (req, res) => {
    try {

        const jobs = await Job.find({
            createdBy: req.user.id,
        })
        .populate("company", "name location website")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getJobById = async (req, res) => {
    try {

        const { id } = req.params;

        const job = await Job.findById(id)
            .populate("company", "name website location");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        return res.status(200).json({
            success: true,
            job,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const updateJob = async (req, res) => {
    try {

        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        Object.assign(job, req.body);

        await job.save();

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteJob = async (req, res) => {
    try {

        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        await Job.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};