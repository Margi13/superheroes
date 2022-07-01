const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    extension: String,
    folderName: String,
    stepOrder: Number,
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    _designedFor: {
        type: mongoose.Types.ObjectId,
        ref: 'Superhero' | 'Comics'
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image