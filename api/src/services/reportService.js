const Report = require('../models/Report');

exports.create = (reportData) => Report.create(reportData);
exports.update = (reportId, reportData) => Report.findByIdAndUpdate(reportId, reportData);

exports.getById = (reportId) => Report.findById(reportId);