const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Schedule Service Page
router.get('/schedule-service', (req, res) => 
    res.render('schedule-service', {
        name: req.user.name
    }));

// Schedule Service Handler

module.exports = router;