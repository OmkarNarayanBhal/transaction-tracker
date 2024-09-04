// routes/auth.js
const express = require('express');
const router = express.Router();
const  { authenticate } = require('../controllers/auth');
// POST /api/auth route
router.post('/', authenticate);

module.exports = router;