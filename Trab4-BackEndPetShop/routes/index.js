const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Welcome through logo
router.get('/welcome', (req, res) => res.render('welcome'));

// Catioro Page
router.get('/cachorro', (req, res) => res.render('cachorro'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;