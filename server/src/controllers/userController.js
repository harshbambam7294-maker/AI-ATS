const User = require("../models/User");
const ResumeAI = require("../models/ResumeAI");

const cloudinary = require("../config/cloudinary");

const extractText = require("../ai/parsers/pdfParser");
const parseResume = require("../ai/parsers/resumeParser");
const reviewResume = require("../ai/parsers/resumeParser");

const fs = require("fs");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume"
            });

        }

        const existingUser = await User.findById(req.user.id);

        if (!existingUser) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // ============================
        // STEP 1 : Extract Resume Text
        // ============================

        const rawText = await extractText(req.file.path);

        // ============================
        // STEP 2 : Parse Resume
        // ============================

        const parsedResume = await parseResume(rawText)
        // ============================
        // STEP 4 : Delete Old Resume
        // ============================

        if (existingUser.resumePublicId) {

            try {

                await cloudinary.uploader.destroy(

                    existingUser.resumePublicId,

                    {

                        resource_type: "raw"

                    }

                );

            }

            catch (err) {

                console.log("Old resume deletion failed.");

            }

        }

        // ============================
        // STEP 5 : Upload to Cloudinary
        // ============================

        const result = await cloudinary.uploader.upload(

            req.file.path,

            {

                resource_type: "raw",

                folder: "HireIQ/Resumes",

                public_id: `resume_${req.user.id}`,

                overwrite: true

            }

        );

        // ============================
        // STEP 6 : Update User
        // ============================

        const user = await User.findByIdAndUpdate(

            req.user.id,

            {

                resume: result.secure_url,

                resumePublicId: result.public_id

            },

            {

                new: true

            }

        ).select("-password");

        // ============================
        // STEP 7 : Save ResumeAI
        // ============================

        await ResumeAI.findOneAndUpdate(

            {

                candidate: req.user.id

            },

            {

                candidate: req.user.id,

                resumeUrl: result.secure_url,

                rawText,

                parsedResume,

                atsScore: 0,

                strengths: [],

                weaknesses: [],

                suggestions: []

            },

            {

                upsert: true,

                new: true

            }

        );

        // ============================
        // STEP 8 : Delete Local File
        // ============================

        if (

            req.file.path &&

            fs.existsSync(req.file.path)

        ) {

            fs.unlinkSync(req.file.path);

        }

        // ============================
        // STEP 9 : Response
        // ============================

        return res.status(200).json({

            success: true,

            message:

                review.atsScore > 0

                    ? "Resume uploaded, parsed and analyzed successfully."

                    : "Resume uploaded successfully. AI review will be generated later.",

            reviewGenerated: review.atsScore > 0,

            resumeUrl: result.secure_url,

            parsedResume,

            review,

            user

        });

    }

    catch (error) {

        console.log(error);

        if (

            req.file?.path &&

            fs.existsSync(req.file.path)

        ) {

            fs.unlinkSync(req.file.path);

        }

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const resumeAI = await ResumeAI.findOne({

            candidate: req.user.id

        });

        return res.status(200).json({

            success: true,

            user

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const updateProfile = async (req, res) => {

    try {

        const {

            name,

            phone,

            headline,

            skills,

            education,

            experience

        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        user.name = name || user.name;

        user.phone = phone || user.phone;

        user.headline = headline || user.headline;

        user.skills = skills || user.skills;

        user.education = education || user.education;

        user.experience = experience || user.experience;

        await user.save();

        return res.json({

            success: true,

            message: "Profile updated successfully.",

            user

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
    uploadResume,
    getProfile,
    updateProfile,
};