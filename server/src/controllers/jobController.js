const Job = require("../models/Job");
const Company = require("../models/Company");
const JobAI = require("../models/JobAI");
const parseJob = require("../ai/parsers/jobParser");

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

        // ---------------------------
        // AI Job Parsing
        // ---------------------------

        const jobText = `
        Title: ${title}

        Description:
        ${description}

        Requirements:
        ${requirements || ""}

        Experience:
        ${experience || ""}

        Employment Type:
        ${employmentType || ""}

        Location:
        ${location}
        `;

        try {

        const parsedJob = await parseJob(jobText);

        await JobAI.findOneAndUpdate(
            {
                job: job._id
            },
            {
                job: job._id,
                parsedJob
            },
            {
                upsert: true,
                new: true
            }
        );

    } catch (error) {

        console.error("AI Parsing Failed:", error.message);

    }


        return res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job,
            aiParsed: true
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

        job.title = req.body.title ?? job.title;
        job.requirements = req.body.requirements ?? job.requirements;
        job.description = req.body.description ?? job.description;
        job.location = req.body.location ?? job.location;
        job.salary = req.body.salary ?? job.salary;
        
        job.experience = req.body.experience ?? job.experience;
        
        job.employmentType = req.body.employmentType ?? job.employmentType;

        

        // ---------------------------
        // Re-parse updated job
        // ---------------------------

        const jobText = `
        Title: ${job.title}

        Description:
        ${job.description}

        Requirements:
        ${job.requirements || ""}

        Experience:
        ${job.experience || ""}

        Employment Type:
        ${job.employmentType || ""}

        Location:
        ${job.location}
        `;

        const parsedJob = await parseJob(jobText);

        await JobAI.findOneAndUpdate(
            {
                job: job._id
            },
            {
                parsedJob
            },
            {
                upsert: true,
                new: true
            }
        );

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

        await JobAI.findOneAndDelete({
        job: id
        });

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
const getPublicJobs = async (req, res) => {
    try {

        const {
            search,
            location,
            employmentType,
            experience,
            salary,
            page = 1,
            limit = 10
        } = req.query;

        let query = {};

        // Search
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { requirements: { $regex: search, $options: "i" } }
            ];
        }

        // Filters
        if (location) {
            query.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (employmentType) {
            query.employmentType = employmentType;
        }

        if (experience) {
            query.experience = {
                $gte: Number(experience)
            };
        }

        if (salary) {
            query.salary = {
                $gte: Number(salary)
            };
        }

        const currentPage = Number(page);
        const pageLimit = Number(limit);

        const skip = (currentPage - 1) * pageLimit;

        const totalJobs = await Job.countDocuments(query);

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit);

        res.status(200).json({
            totalJobs,
            totalPages: Math.ceil(totalJobs / pageLimit),
            currentPage,
            limit: pageLimit,
            hasNextPage: currentPage < Math.ceil(totalJobs / pageLimit),
            hasPrevPage: currentPage > 1,
            jobs
});

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getPublicJobById = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)
            .populate("company");

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Job not found"

            });

        }

        return res.status(200).json({

            success: true,

            job

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getPublicJobs,
    getPublicJobById,
};