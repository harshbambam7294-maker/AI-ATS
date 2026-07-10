const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createCompany,
    getCompanies,
    updateCompany,
} = require("../controllers/companyController");

router.post(
    "/",
    protect,
    authorize("recruiter"),
    createCompany
);

router.put(
    "/:id",
    protect,
    authorize("recruiter"),
    updateCompany
);

router.get(
    "/",
    protect,
    authorize("recruiter"),
    getCompanies
);

module.exports = router;