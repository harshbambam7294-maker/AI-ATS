const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume"
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "HireIQ/Resumes"
        });

        fs.unlinkSync(req.file.path);

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                resume: result.secure_url
            },
            {
                new: true
            }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: user.resume,
            user
        });

    } catch (error) {

        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    uploadResume
};