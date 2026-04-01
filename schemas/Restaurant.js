const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    operatingHrs: {
        type: String, 
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    image: {
        type: String,
        required: false,
        default: ''
    },
    rating: {
        type: Number,
        required: false,
        default: ''
    },
    featured: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);