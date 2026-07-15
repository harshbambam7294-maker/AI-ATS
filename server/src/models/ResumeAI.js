const mongoose = require("mongoose");

const resumeAISchema = new mongoose.Schema({

    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    resumeUrl: {
        type: String,
        required: true
    },

    rawText: {
        type: String,
        default: ""
    },

    parsedResume: {

        name: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            default: ""
        },

        summary: {
            type: String,
            default: ""
        },

        skills: [{
            type: String
        }],

        education: [{

            degree: {
                type: String,
                default: ""
            },

            institution: {
                type: String,
                default: ""
            },

            year: {
                type: String,
                default: ""
            }

        }],

        experience: [{

            company: {
                type: String,
                default: ""
            },

            role: {
                type: String,
                default: ""
            },

            duration: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                default: ""
            }

        }],

        projects: [{

            title: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                default: ""
            },

            technologies: [{
                type: String
            }]

        }],

        certifications: [{
            name: String,

            issuer: String,

            year: String

        }],

        languages: [{
            type: String
        }],

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        }

    },

    atsScore: {
        type: Number,
        default: 0
    },

    strengths: [{
        type: String
    }],

    weaknesses: [{
        type: String
    }],

    suggestions: [{
        type: String
    }],

    matchScore: {
        type: Number,
        default: 0
    },

    lastParsed: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("ResumeAI", resumeAISchema);