const getReport = require('./../controllers/reportHandler.js');
const express = require('express');
const router = express.Router();
router.post('/reports', getReport.postReportDetails);
router.get('/reports', getReport.getReportDetails);
module.exports = router;
