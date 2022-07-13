const Comics = require('../models/Comics');

exports.getAllApproved = () => Comics.find({ status: 1 });
exports.getAllPending = () => Comics.find({ status: 0 });
exports.getAllDeclined = () => Comics.find({ status: -1 });
exports.getAllReported = () => Comics.find().then((res) => res.filter(data => (data.reports | []).length > 0));

exports.getOwn = (ownerId) => Comics.find({ _ownerId: ownerId });
exports.getOne = (comicsId, populate) => {
    const finded = Comics.findById(comicsId)
    if (populate === true) {
        finded.populate("_ownerId");
    }
    return finded;
}
exports.getByTitle = (title) => Comics.find({ title: title });

exports.create = (comicsData) => Comics.create(comicsData);
exports.update = (comicsId, comicsData) => Comics.findByIdAndUpdate(comicsId, comicsData);
exports.delete = (comicsId) => Comics.findByIdAndDelete(comicsId);