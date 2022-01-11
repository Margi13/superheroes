const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    _superheroId: {
        type: mongoose.Types.ObjectId,
        ref: 'Superhero'
    },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like