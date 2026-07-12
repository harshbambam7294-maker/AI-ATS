const mongoose = require("mongoose");

const jobAISchema = new mongoose.Schema({

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
        unique: true
    },

    parsedJob: {

        title: String,

        summary: String,

        requiredSkills: [String],

        preferredSkills: [String],

        responsibilities: [String],

        keywords: [String],

        minimumExperience: String,

        education: String,

        domain: String,

        seniority: String

    }

}, {
    timestamps: true
});

module.exports = mongoose.model("JobAI", jobAISchema);