const Company = require("../models/Company");

const createCompany = asyncHandler(async (req, res) => {

        const { name, description, website, location, logo } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Company name is required",
            });
        }

        const company = await Company.create({
            name,
            description,
            website,
            location,
            logo,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            company,
        });
});

const getCompanies = asyncHandler(async (req, res) => {


        const companies = await Company.find({
            createdBy: req.user.id,
        });

        return res.status(200).json({
            success: true,
            companies,
        });

});

const updateCompany = asyncHandler(async (req, res) => {

        const { id } = req.params;
        const { name, description, website, location, logo } = req.body;

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        // Ensure the logged-in recruiter owns this company
        if (company.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this company",
            });
        }

        company.name = name || company.name;
        company.description = description || company.description;
        company.website = website || company.website;
        company.location = location || company.location;
        company.logo = logo || company.logo;

        await company.save();

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company,
        });
});

const getCompanyById = asyncHandler(async (req, res) => {

        const { id } = req.params;

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        // Only owner can view
        if (company.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }

        return res.status(200).json({
            success: true,
            company,
        });
});

const deleteCompany = asyncHandler(async (req, res) => {

        const { id } = req.params;

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        // Only owner can delete
        if (company.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this company",
            });
        }

        await Company.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        });

});

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};``