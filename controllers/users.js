// Импорт констант
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ValidationError, CastError } = require('mongoose').Error;
const User = require('../models/user');
const { JWT_SECRET, ERROR_CODE_UNIQUE } = require('../utils/constants');

// Импорт авторских ошибок
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
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new NotUnique('Пользователь с такой почтой уже зарегистрирован'));
      } else if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
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
    .orFail(new ErrorAccess('Пользователь не найден'))
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
            next(new ErrorAccess({ message: 'Неверный логин или пароль' }));
          }
        });
    })
    .catch(next);
};

// Контроллер запроса авторизованного юзера
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(new NotFound(`Пользователь по указанному id: ${_id} не найден`))
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
        next(new NotFound('Пользователь по указанному id не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        next(new BadRequest('Данные введены некоректно'));
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
