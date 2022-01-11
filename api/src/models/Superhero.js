const mongoose = require('mongoose');

const superheroSchema = new mongoose.Schema({
    personName: String,
    heroName: String,
    kind: String,
    age: Number,
    imageUrl: String,
    story: String,
    likes: Array,
    status: Number,
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Superhero = mongoose.model('Superhero', superheroSchema);

module.exports = Superhero