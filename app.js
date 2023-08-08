const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const router = require('./routes');

const app = express();
app.use(cors());

mongoose.connect('mongodb://27017/bitfilmsdb');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000);
