const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001'
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Use routes for recipes
const recipeRouter = require('./routes/recipes');
app.use('/api/recipes', recipeRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});


