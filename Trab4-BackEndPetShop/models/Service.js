const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    petname: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    servicetype: {
        type: String,
        required: true
    },
    servicedate: {
        type: String,
        required: true
    },
    servicetime: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Service = mongoose.model('Service', UserSchema);

module.exports = Service;