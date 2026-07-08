const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

app.use(express.json());

app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to HireIQ API 🚀");
});

app.use("/api/auth", authRoutes);

module.exports = app;