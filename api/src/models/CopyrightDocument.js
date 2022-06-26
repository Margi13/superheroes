const mongoose = require('mongoose');

const copyrightSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dataType: {
        type: String,
        enum: ['comics', 'heroes'],
        required: true
    },
    dataId: {
        type: String,
        required: true
    },
    _createdOn: Date,
    _updatedOn: Date
});

const Copyright = mongoose.model('Copyright', copyrightSchema);

module.exports = Copyright;