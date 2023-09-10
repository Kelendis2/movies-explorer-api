const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { PORT, MONGO, LIMITER } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const router = require('./routes');

const app = express();
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Разрешаем запросы только с этого домена
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешенные HTTP-методы
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешенные заголовки
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Разрешаем передачу куки и аутентификацию

  if (req.method === 'OPTIONS') {
    // Если это предварительный (preflight) запрос, завершаем его успешно
    return res.sendStatus(200);
  }

  next(); // Продолжаем обработку запроса
});

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

app.listen(PORT);
