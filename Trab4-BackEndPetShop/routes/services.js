const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

// Service
const Service = require('../models/Service');

// Schedule Service Page
router.get('/schedule-service', (req, res) => 
    res.render('schedule-service', {
        name: req.user.name
    }));

router.get('/visualize-service', (req, res) =>
    res.render('visualize-service', {
        name: req.user.name
    }));

// Schedule Handler
router.post('/schedule-service', (req, res) => {

    var user_id = req.user.name;
    const {petname, species, servicetype, servicedate, servicetime} = req.body;

    let errors = [];

    // Check required fields 
    if(!petname || !species || !servicetype || !servicedate || !servicetime) {
        errors.push({ msg: 'Please fill in all fields.'});
    }

    if(errors.length > 0) {
        res.render('schedule-service', {
            errors,
            petname,
            servicetype,
            servicedate,
            servicetime,
            user_id
        });
    }
    else {
        //Validation passed
        const newService = new Service({
            petname,
            species,
            servicetype,
            servicedate,
            servicetime,
            user_id
        });

        newService.save()
            .then(service => {
                req.flash('success_msg', 'Serviço foi agendado.');
                res.redirect('/services/schedule-service');
            })
            .catch(err => console.log(err))
    }
});

// Schedule Service Handler

module.exports = router;