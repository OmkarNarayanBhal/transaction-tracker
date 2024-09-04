// server/controllers/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Default credentials
const DEFAULT_USERNAME = 'omkar';
const DEFAULT_PASSWORD = 'omkar1234';

const authenticate = (req, res) => {
    const { username, password } = req.body;

    // Check username and password
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Generate JWT token
        const token = jwt.sign({ username }, 'omkarrrrrrrrr', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { authenticate };