import express from "express";

const app = express();

const PORT = 3000;

// Global Middleware: Logs requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} request to ${req.url}`);
    next();
});

// Route-specific Middleware: Authentication check
const authenticateUser = (req, res, next) => {
    const userAuthenticated = true; 
    if (!userAuthenticated) {
        return res.status(403).send("You are not authorized to access this resource.");
    }
    next();
};

// Route: Protected /order endpoint
app.get('/order', authenticateUser, (req, res) => {
    res.send("Your food order has been placed successfully!");
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});