const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const jobRoutes = require("./routes/jobRoutes");

const companyRoutes = require("./routes/companyRoutes");

const applicationRoutes = require("./routes/applicationRoutes");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/test", testRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/company", companyRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to HireIQ API 🚀");
});

app.use("/api/auth", authRoutes);

app.use("/api/applications", applicationRoutes);

module.exports = app;

const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);