const mongoose = require('mongoose');

const superheroShema = new mongoose.Schema({
    personName: String,
    heroName: String,
    kind: String,
    age: Number,
    imageUrl: String,
    story: String,
    likes: Array,
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Superhero = mongoose.model('Superhero', superheroShema);

module.exports = Superhero