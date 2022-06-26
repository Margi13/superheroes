const Copyright = require('../models/CopyrightDocument')
const UserRight = require('../models/UseRightDocument')

// Copyrights
exports.getAllCopyrights = () => Copyright.find();
exports.getOwnCopyrights = (ownerId) => Copyright.find({ _userId: ownerId});
exports.getOneCopyright = (documentId) => Copyright.findById(documentId);

exports.createCopyright = (documentData) => Copyright.create(documentData);
exports.deleteCopyright = (documentId) => Copyright.findByIdAndDelete(documentId);

// Use rights
exports.getAllUseRights = () => UserRight.find();
exports.getAllUseRightsByResponse = (response) => UserRight.find({response: response});
exports.getUseRightsByDocOwnerId = (docOwnerId) => UserRight.find({ _docOwnerId: docOwnerId});
exports.getUseRightsByDataOwnerId = (dataOwnerId) => UserRight.find({ _dataOwnerId: dataOwnerId});
exports.getOneUseRight = (documentId) => UserRight.findById(documentId);

exports.createUseRight = (documentData) => UserRight.create(documentData);
exports.updateUseRight = (documentId, documentData) => UserRight.findByIdAndUpdate(documentId, documentData);
exports.deleteUseRight = (documentId) => UserRight.findByIdAndDelete(documentId);
