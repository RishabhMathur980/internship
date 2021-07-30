const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
dotenv.config({ path: './config.env' });
const routes = require('./routes/request.js');
app.use(express.json());

const DB = process.env.DATABASE_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DATABASE CONNECTED');
  });
app.use('/', routes);
app.listen(3000, () => {
  console.log('server is runnig at 3000 port');
});
