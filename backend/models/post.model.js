const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    message: {
        type: String,
        required: false,
        trim: true,
    },
    audioUrl: {
        type: String,
        required: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // ajout des likes dans un tableau
    likers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: '1d',
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('post', postSchema);