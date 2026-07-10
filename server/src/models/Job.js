const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        requirements: [
            {
                type: String,
            },
        ],

        salary: {
            type: Number,
            default: 0,
        },

        location: {
            type: String,
            required: true,
        },

        experience: {
            type: Number,
            default: 0,
        },

        employmentType: {
            type: String,
            enum: ["Full-time", "Internship", "Part-time", "Contract"],
            default: "Full-time",
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Job", jobSchema);