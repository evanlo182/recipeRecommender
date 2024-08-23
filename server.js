require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const cors = require('cors'); // Import CORS to handle cross-origin requests
const recipeRoutes = require('./routes/recipes'); // Import recipe routes
const app = express(); // Create an instance of Express
const userRoutes = require('./routes/users')
//const pantryRoutes = require('./routes/pantry');


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/recipes', recipeRoutes); // Tell app to use the routes under /recipes
app.use('/api/users', userRoutes)
//app.use('/api/pantry', pantryRoutes)

const PORT = process.env.PORT || 4000; // Use port from .env or default to 4000

// Define a basic route to test the server
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

