const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8 
    },
    isAdmin:  { 
        type: Boolean, 
        default: false 
    },
    joinDate: { 
        type: Date, 
        default: Date.now 
    },
    phoneNum: { 
        type: String, 
        required: false, 
        default: '' 
    },
    image: { 
        type: String, 
        required: false, 
        default: '/images/profile.png'       // insert like placeholder img
    }, 
    description: {
        type: String,
        required: false,
        default: ''
    },
    managedRestaurants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant',
        default: []
    }]
});

module.exports = mongoose.model('User', userSchema);