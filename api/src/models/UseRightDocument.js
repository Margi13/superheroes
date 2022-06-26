const mongoose = require('mongoose');

const useRightSchema = new mongoose.Schema({
    _docOwnerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _dataOwnerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        minLength: [30, 'The message should be at least 30 characters long'],
        required: true

    },
    dataId: {
        type: String, 
        required: true
    },
    requestedDataType: {
        type: String,
        enum: ['comics', 'heroes'],
        required: true
    },
    newDataType: {
        type: String,
        enum: ['comics', 'heroes'],
        required: true
    },
    response: Boolean,
    _createdOn: Date,
    _updatedOn: Date
});

const UseRight = mongoose.model('UseRight', useRightSchema);

module.exports = UseRight;