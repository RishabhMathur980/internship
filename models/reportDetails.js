const mongoose = require('mongoose');
const reportSchema = mongoose.Schema({
  userID: [String],
  marketID: String,
  marketName: String,
  cmdtyID: String,
  marketType: String,
  cmdtyName: String,
  priceUnit: String,
  convFctr: Number,
  price: Number,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});
const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
