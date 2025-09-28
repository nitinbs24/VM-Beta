// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const fraRoutes = require('./routes/fraRoutes');
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/fra', fraRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});