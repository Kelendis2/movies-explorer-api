// Импорт параметров
const { ALLOWED_METHODS, ALLOWED_CORS } = require('../utils/config');

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.headerres.header('Access-Control-Allow-Origin', '*');

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = cors;
