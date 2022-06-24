const mongoose = require('mongoose');

const comicsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minLength: [2, 'The title should be at least 2 characters long']
    },
    genre: {
        type: String,
        required: true,
        maxlength: [30, 'The genre should be maximum 30 characters long'] 
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'The description should be at least 10 characters long']
    },
    coverPage: {
        type: String,
        required: true
    },
    imagesUrl: Array,
    status: {
        type: Number,
        default: 0
    },
    likes: Array,
    reports: Array,
    participants: Array,
    coworkers: Array,
    _createdOn: Date,
    _updatedOn: Date,
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Comics = mongoose.model('Comics', comicsSchema);

module.exports = Comics