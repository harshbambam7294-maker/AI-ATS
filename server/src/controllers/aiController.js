const ResumeAI = require("../models/ResumeAI");
const JobAI = require("../models/JobAI");
const MatchResult = require("../models/MatchResult");
const reviewResume = require("../ai/generators/resumeReview");

const matchCandidate = require("../ai/engines/matchingEngine");

const generateMatch = async (req, res) => {

    try {

        const { candidateId, jobId } = req.body;

        if (!candidateId || !jobId) {
            return res.status(400).json({
                success: false,
                message: "Candidate ID and Job ID are required."
            });
        }

        const resumeAI = await ResumeAI.findOne({
            candidate: candidateId
        });

        if (!resumeAI) {
            return res.status(404).json({
                success: false,
                message: "Resume AI data not found."
            });
        }

        const jobAI = await JobAI.findOne({
            job: jobId
        });

        if (!jobAI) {
            return res.status(404).json({
                success: false,
                message: "Job AI data not found."
            });
        }

        const result = await matchCandidate(
            resumeAI,
            jobAI
        );

        const match = await MatchResult.findOneAndUpdate(
            {
                candidate: candidateId,
                job: jobId
            },
            {
                candidate: candidateId,
                job: jobId,
                ...result
            },
            {
                new: true,
                upsert: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Candidate matched successfully.",
            match
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRankings = async (req, res) => {

    try {

        const { jobId } = req.params;

        const rankings = await MatchResult.find({
            job: jobId
        })
        .populate({
            path: "candidate",
            select: "name email resume"
        })
        .sort({
            overallScore: -1
        });

        return res.status(200).json({
            success: true,
            totalCandidates: rankings.length,
            rankings
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const generateResumeReview = async (req, res) => {

    try {

        const { candidateId } = req.params;

        const resumeAI = await ResumeAI.findOne({
            candidate: candidateId
        });

        if (!resumeAI) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const review = await reviewResume(
            resumeAI.parsedResume
        );

        resumeAI.atsScore = review.atsScore;
        resumeAI.strengths = review.strengths;
        resumeAI.weaknesses = review.weaknesses;
        resumeAI.suggestions = review.suggestions;

        await resumeAI.save();

        return res.status(200).json({
            success: true,
            review
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    generateMatch,
    getRankings,
    generateResumeReview
};