const rateLimit = require('express-rate-limit');

const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = '64b47cd7d12efe505db55667',
  NODE_ENV,
} = process.env;

const regexp = /(http:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)|(https:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)/;

const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const ALLOWED_CORS = [
  'https://savemovies.kelendis.nomoredomainsicu.ru/',
  'https://savemovies.kelendis.nomoredomainsicu.ru/',
  'localhost:3000',
  'localhost:3000',
];
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO,
  NODE_ENV,
  LIMITER,
  regexp,
  ALLOWED_CORS,
  ALLOWED_METHODS,
};
