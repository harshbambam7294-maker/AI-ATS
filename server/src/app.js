const express = require("express");
const cors = require("cors");
const app = express();



// ----------------------
// Middleware
// ----------------------

app.use(cors({
    origin: "https://ai-ats-6p45.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// ----------------------
// Routes
// ----------------------

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const testRoutes = require("./routes/testRoutes");

// ----------------------
// API Routes
// ----------------------

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/test", testRoutes);

// ----------------------
// Home Route
// ----------------------

app.get("/", (req, res) => {
    res.send("🚀 Welcome to HireIQ API");
});

// ----------------------
// Error Handler
// ----------------------

const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);

module.exports = app;