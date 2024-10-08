// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming requests
app.use(express.json());

// Define Routes
app.use('backend/models/users', require('./backend/routes/user'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const dashboardRoute = require('./backend/routes/dashboard');
app.use('backend/api/dashboard', dashboardRoute);

const cors = require('cors');
app.use(cors());

const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/EzClass';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        // Your database operations here
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
