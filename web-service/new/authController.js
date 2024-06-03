
// new/authController 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


exports.register = async (req, res) => {
  console.log('Request Body:', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    console.log('Registering user:', username);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const newUser = new User({
      username,
      password: hashedPassword,
      account_created: new Date()
    });

    const savedUser = await newUser.save();

    console.log('User registered with ID:', savedUser._id);
    res.status(201).json({ id: savedUser._id, username: savedUser.username });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.code === 11000) { // Duplicate key error for MongoDB
      res.status(400).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: 'An error occurred during registration' });
    }
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Username or password missing');
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    console.log('User found:', user);

  

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};
exports.protected = (req, res) => {
  res.status(200).json({ message: 'This is a protected resource', user: req.user });
};
