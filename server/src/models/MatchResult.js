const mongoose = require("mongoose");

const matchResultSchema = new mongoose.Schema({

    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    overallScore: Number,

    skillScore: Number,

    experienceScore: Number,

    educationScore: Number,

    projectScore: Number,

    strengths: [String],

    weaknesses: [String],

    missingSkills: [String],

    recommendation: String

},{
    timestamps:true
});

matchResultSchema.index(
    {
        candidate:1,
        job:1
    },
    {
        unique:true
    }
);

module.exports = mongoose.model("MatchResult",matchResultSchema);