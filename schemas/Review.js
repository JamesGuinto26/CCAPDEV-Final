const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },

    rating: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5
    },

    comment: { 
        type: String,
        default: ''
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },

    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        ref: 'Restaurant',
        required: true 
    },

    media: {
        type: [
            {
                url: {
                    type: String,
                    required: true
                },
                mediaType: {
                    type: String,
                    enum: ['image', 'video'],
                    required: true
                }
            }
        ],
        default: [],  
        validate: {
            validator: function (value) {
                return value.length <= 3;
            },
            message: 'Maximum of 3 media files allowed.'
        }
    },
    reviewDate: { 
        type: Date,
        default: Date.now
    },
    editedAt: {            
        type: Date,
        default: null
    },
    helpfulCount: { // new
        type: Number,
        default: 0 
    },
    unhelpfulCount: {
        type: Number,
        default: 0
    },
    helpfulUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    unhelpfulUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }]

});

module.exports = mongoose.model('Review', reviewSchema);