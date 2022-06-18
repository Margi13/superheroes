const mongoose = require('mongoose');

const comicsSchema = new mongoose.Schema({
    title: String,
    description: String,
    imagesUrl: Array,
    coverPage: String,
    status: Number,
    likes: Array,
    participants: Array,
    coworkers: Array,
    _createdOn: Date,
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Comics = mongoose.model('Comics', comicsSchema);

module.exports = Comics