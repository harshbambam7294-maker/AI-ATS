const Company = require("../models/Company");

const createCompany = async (req, res) => {
    try {

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

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getCompanies = async (req, res) => {
    try {

        const companies = await Company.find({
            createdBy: req.user.id,
        });

        return res.status(200).json({
            success: true,
            companies,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const updateCompany = async (req, res) => {
    try {

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

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createCompany,
    getCompanies,
    updateCompany,
};