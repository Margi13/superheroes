const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
    personName: {
        type: String,
        required: true,
        minLength: [4, 'The name should be at least 4 characters long']
    },
    heroName: {
        type: String,
        unique: true,
        required: true,
        minLength: [2, 'The name should be at least 2 characters long']
    },
    kind: {
        type: String,
        required: true,
        minLength: [2, 'The kind should be at least 2 characters long'],
        maxLength: [15, 'The kind should be maximum 15 characters long']
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    imageUrl: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
        minLength: [10, 'The story should be at least 10 characters long']
    },
    likes: Array,
    reports: Array,
    status: {
        type: Number,
        default: 0
    },
    _createdOn: Date,
    _updatedOn: Date,
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Superhero = mongoose.model('Superhero', superheroSchema);

module.exports = Superhero