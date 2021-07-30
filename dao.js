const Report = require('./models/reportDetails.js');
exports.postDetailsQuery = async function (body) {
  try {
    let query = [];
    query.push(
      {
        $match: {
          marketID: body.marketID,
        },
        $match: {
          cmdtyID: body.cmdtyID,
        },
      },
      {
        $addFields: { newPrice: { $divide: [body.price, body.convFctr] } },
      },
      {
        $addFields: { priceUnit: 'Kg' },
      },
      {
        $addFields: { sumPrice: { $sum: ['$newPrice', '$price'] } },
      },
      {
        $addFields: { price: { $divide: ['$sumPrice', 2] } },
      },
      {
        $group: {
          _id: null,
          marketID: { $first: body.marketID },
          marketName: { $first: body.marketName },
          cmdtyID: { $first: body.cmdtyID },
          cmdtyName: { $first: body.cmdtyName },
          priceUnit: { $first: '$priceUnit' },
          price: { $first: '$price' },
          userID: { $push: body.userID },
        },
      },
      {
        $project: {
          _id: 0,
          newPrice: 0,
          sumPrice: 0,
        },
      }
    );
    let data = await Report.aggregate(query);
    if (!data[0]) {
      let queryData = [];
      queryData.push(
        {
          $group: {
            _id: null,
            userID: { $first: body.userID },
            marketID: { $first: body.marketID },
            marketName: { $first: body.marketName },
            cmdtyID: { $first: body.cmdtyID },
            cmdtyName: { $first: body.cmdtyName },
            priceUnit: { $first: 'Kg' },
            price: { $first: { $divide: [body.price, body.convFctr] } },
          },
        },
        {
          $project: {
            _id: 0,
          },
        }
      );
      console.log(queryData);
      let detail = await Report.aggregate(queryData);
      return detail[0];
    }
    return data[0];
  } catch (err) {
    console.log(err);
  }
};
