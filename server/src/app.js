const express = require("express");

const app = express();

/*
Middleware will come here
Routes will come here
*/

app.get("/", (req, res) => {
    res.send("Welcome to HireIQ API 🚀");
});

module.exports = app;