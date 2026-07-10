const express = require("express");

const router = express.Router();

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

router.post(
    "/create",
    protect,
    authorize("recruiter"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Job Created Successfully"
        });

    }
);

module.exports = router;