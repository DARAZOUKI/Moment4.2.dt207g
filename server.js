const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path'); 
const dotenv = require('dotenv');
const authController = require('./web-service/new/authController');
const { verifyToken } = require('./web-service/middleware/authMiddleware');

require('dotenv').config();


const app = express();
app.use(bodyParser.json());
// Middleware
app.use(cors());
app.use(express.json());


app.use(express.static(__dirname + '/src'));

// Debugging: Log the MONGO_URI
console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    });

 
// Routes
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.get('/api/protected', verifyToken, authController.protected);
 // Catch-all route to serve the index.html file
 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
  });
// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
