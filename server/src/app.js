const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const jobRoutes = require("./routes/jobRoutes");

app.use(express.json());

app.use("/api/test", testRoutes);

app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to HireIQ API 🚀");
});

app.use("/api/auth", authRoutes);

module.exports = app;