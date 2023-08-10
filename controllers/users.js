// Импорт констант
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ValidationError, CastError } = require('mongoose').Error;
const User = require('../models/user');
// Импорт авторских ошибок
const {
  JWT_SECRET,
  DUPLICATED_USER_ERROR,
  LOGIN_ERROR,
  NOT_FOUND_USER_ERROR,
  BAD_REQUEST_USER_ERROR,
  BAD_REQUEST_ERROR,
  ERROR_CODE_UNIQUE,
  STATUS_OK_201,
} = require('../utils/constants');

const NotUnique = require('../utils/errors/ NotUnique');
const BadRequest = require('../utils/errors/BadRequest');
const ErrorAccess = require('../utils/errors/ErrorAccess');
const NotFound = require('../utils/errors/NotFound');

// Контроллер создания пользователя
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt.hash(String(password), 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(STATUS_OK_201).send({ data: user });
    })
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new NotUnique(DUPLICATED_USER_ERROR));
      } else if (err instanceof ValidationError) {
        next(new BadRequest(BAD_REQUEST_USER_ERROR));
      } else {
        next(err);
      }
    });
};

// Контроллер авторизации
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new ErrorAccess(NOT_FOUND_USER_ERROR))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const newToken = jwt.sign({ _id: user._id }, JWT_SECRET);
            res.cookie('token', newToken, {
              maxAge: 36000 * 24 * 7,
              httpOnly: true,
              sameSite: true,
            }).send({ data: user.toJSON() });
          } else {
            next(new ErrorAccess(LOGIN_ERROR));
          }
        });
    })
    .catch(next);
};

// Контроллер запроса авторизованного юзера
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(new NotFound(NOT_FOUND_USER_ERROR))
    .then((user) => res.send(user))
    .catch(next);
};

// Контроллер изменения информациив профиле
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate({ _id }, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound(NOT_FOUND_USER_ERROR));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        next(new BadRequest(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
