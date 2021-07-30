const Report = require('./../models/reportDetails.js');
const dao = require('./../dao.js');
exports.postReportDetails = async (req, res, next) => {
  const data = await dao.postDetailsQuery(req.body);
  const details = await Report.create(data);
  if (!details) {
    res.status(404).json({ status: 'failed', reportID: 'not found' });
  }
  res.status(200).json({ status: 'Success', reportID: details._id });
};
exports.getReportDetails = async (req, res, next) => {
  const data = await Report.find({ _id: req.query.reportID });
  if (!data) {
    res.status(404).json({ message: 'not found' });
  }
  res.status(200).json(data);
};
