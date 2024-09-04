const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
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
},
{
    timestamps: true,
});

module.exports = mongoose.model('post', postSchema);