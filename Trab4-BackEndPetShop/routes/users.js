const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/cadastro', (req, res) => res.render('cadastro'));

// Register Handle
router.post('/cadastro', (req, res) => {
    const { name, email, password, password2 } = req.body;
    
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields.' });
    }

    // Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match.' });
    }

    // Check password length
    if(password.length < 8) {
        errors.push({ msg: 'Password needs to be at least 8 characters long.' });
    }

    if(errors.length > 0) {
        res.render('cadastro', {
            errors,
            name,
            email, 
            password,
            password2
        });
    }
    else {
        // Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    //User exists
                    errors.push({ message: 'Email is already registered' });
                    res.render('cadastro', {
                        errors,
                        name,
                        email, 
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // Set password to hashed
                            newUser.password = hash;

                            // Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('sucess_msg', 'You are now registered and can log in.');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                    }))
                }
            });
    }
});

// Login Handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout Handler
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/users/login');
});

module.exports = router;