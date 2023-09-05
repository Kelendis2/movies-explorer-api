const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { PORT, MONGO, LIMITER } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const router = require('./routes');

const app = express();
app.use(helmet());
app.use(LIMITER);

mongoose.connect(MONGO);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.use(cors());

app.listen(PORT);
