const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportMessage: {
        type: String,
        minLength: [10, 'The message should be at least 10 characters long'],
        default: 'I want to report this'
    },
    active: Boolean,
    _createdOn: Date
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;