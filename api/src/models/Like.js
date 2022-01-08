const mongoose = require('mongoose');

const likeShema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    _superheroId: {
        type: mongoose.Types.ObjectId,
        ref: 'Superhero'
    },
});

const Like = mongoose.model('Like', likeShema);

module.exports = Like