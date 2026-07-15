const ResumeAI = require("../models/ResumeAI");
const JobAI = require("../models/JobAI");
const MatchResult = require("../models/MatchResult");
const ai = require("../AI/services/geminiService");
const interviewPrompt = require("../AI/prompts/interviewPrompt");
const reviewResume = require("../AI/generators/resumeReview");

const matchCandidate = require("../AI/engines/matchingEngine");

const User = require("../models/User");
const Job = require("../models/Job");

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

        const candidate = await User.findById(candidateId)
        .select("name email");

        const job = await Job.findById(jobId)
        .populate("company", "name");


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
            match,
            candidate,
            job
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

        const resumeAI = await ResumeAI.findOne({

            candidate: req.user.id

        });

        if (!resumeAI) {

            return res.status(404).json({

                success: false,

                message: "Resume not found"

            });

        }

        return res.status(200).json({

            success: true,

            review: {

                atsScore: resumeAI.atsScore,

                strengths: resumeAI.strengths,

                weaknesses: resumeAI.weaknesses,

                suggestions: resumeAI.suggestions

            },

            parsedResume: resumeAI.parsedResume

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const generateInterviewQuestions = async (req, res) => {

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
                message: "Resume AI not found."
            });

        }

        const jobAI = await JobAI.findOne({
            job: jobId
        });

        if (!jobAI) {

            return res.status(404).json({
                success: false,
                message: "Job AI not found."
            });

        }

        const prompt = `${interviewPrompt}

Candidate Resume

${JSON.stringify(resumeAI.parsedResume, null, 2)}

Job Description

${JSON.stringify(jobAI.parsedJob, null, 2)}

`;

        const response = await ai.models.generateContent({

            model: "gemini-3.5-flash",

            contents: prompt

        });

        let output = response.text;

        output = output
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = output.indexOf("{");
        const end = output.lastIndexOf("}");

        if (start !== -1 && end !== -1) {

            output = output.substring(start, end + 1);

        }

        const candidate = await User.findById(candidateId)
        .select("name email");

        const job = await Job.findById(jobId)
        .populate("company", "name");

        const questions = JSON.parse(output);

        return res.status(200).json({

            success: true,
            candidate,
            job,
            questions

        });

        

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const generateAIReview = async (req, res) => {

    try {

        const resumeAI = await ResumeAI.findOne({

            candidate: req.user.id

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

            message: "AI Review Generated Successfully",

            review

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports = {
    generateMatch,
    getRankings,
    generateResumeReview,
    generateInterviewQuestions,
    generateAIReview
};