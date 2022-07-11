const Copyright = require('../models/CopyrightDocument')
const UseRight = require('../models/UseRightDocument')

// Copyrights
exports.getAllCopyrights = () => Copyright.find();
exports.getOwnCopyrights = (ownerId) => Copyright.find({ _userId: ownerId});
exports.getFilteredCopyright = (dataId, ownerId) => Copyright.find({ dataId: dataId, _userId: ownerId});
exports.getOneCopyright = (documentId) => Copyright.findById(documentId);

exports.createCopyright = (documentData) => Copyright.create(documentData);
exports.deleteCopyright = (documentId) => Copyright.findByIdAndDelete(documentId);

// Use rights
// exports.getAllUseRights = () => UseRight.find();
// exports.getAllUseRightsByResponse = (response) => UseRight.find({response: response});
// exports.getUseRightsByDocOwnerId = (docOwnerId) => UseRight.find({ _docOwnerId: docOwnerId});
// exports.getUseRightsByDataOwnerId = (dataOwnerId) => UseRight.find({ _dataOwnerId: dataOwnerId});
// exports.getFilteredUseRight = (dataId, dataOwnerId, docOwnerId) => Copyright.find({ dataId: dataId, _docOwnerId: docOwnerId, _dataOwnerId: dataOwnerId});
// exports.getOneUseRight = (documentId) => UseRight.findById(documentId);

// exports.createUseRight = (documentData) => UseRight.create(documentData);
// exports.updateUseRight = (documentId, documentData) => UseRight.findByIdAndUpdate(documentId, documentData);
// exports.deleteUseRight = (documentId) => UseRight.findByIdAndDelete(documentId);
