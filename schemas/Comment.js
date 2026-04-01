const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    reviewId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    commentDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Comment', commentSchema);

// schema refers to structure
// Comment is model name