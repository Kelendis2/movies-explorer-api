const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server run');
});
