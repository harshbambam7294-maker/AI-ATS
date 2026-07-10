const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} = require("../controllers/companyController");

router.delete(
    "/:id",
    protect,
    authorize("recruiter"),
    deleteCompany
);

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
    "/:id",
    protect,
    authorize("recruiter"),
    getCompanyById
);

router.get(
    "/",
    protect,
    authorize("recruiter"),
    getCompanies
);

module.exports = router;