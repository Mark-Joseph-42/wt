// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  // Remove deprecated options that are no longer needed in Mongoose 6+
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // Add SSL/TLS options for better compatibility
  ssl: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  // Increase connection timeout
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

connection.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});

// Import Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});