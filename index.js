const express = require("express");
const app = express();

const statusCodes = {
    200: "OK - The request was successful.",
    201: "Created - The resource was successfully created.",
    400: "Bad Request - The request could not be understood by the server.",
    401: "Unauthorized - Authentication is required.",
    403: "Forbidden - You do not have permission to access this resource.",
    404: "Not Found - The requested resource could not be found.",
    500: "Internal Server Error - A generic server error occurred."
};

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the Status Code API! Use /status-info?code=200 to test.");
});

// Status Code API Route
app.get("/status-info", (req, res) => {
    if (!req.query.code) {
        return res.status(400).json({ error: "Please provide a status code using '?code=200'." });
    }

    const statusCode = parseInt(req.query.code);

    if (isNaN(statusCode)) {
        return res.status(400).json({ error: "Invalid status code. Please enter a number." });
    }

    if (statusCodes[statusCode]) {
        res.json({ code: statusCode, message: statusCodes[statusCode] });
    } else {
        res.status(400).json({ error: "Invalid or unsupported status code." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
