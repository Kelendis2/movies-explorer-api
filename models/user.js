// Импорт пакетов
const mongoose = require('mongoose');
const validator = require('validator');
const { VALIDATION_EMAIL_ERROR } = require('../utils/constants');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({

  email: { // обязателдьное поле почта: уникальная строка
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: VALIDATION_EMAIL_ERROR,
    },
  },

  password: { // обязательное поле пароль: строка, не передавать в схеме
    type: String,
    required: true,
    select: false,
  },

  name: { // имя пользователя: строка длиной от 2 до 30 символов, по умолчанию Неизвестный Единорог
    default: 'Неизвестный Единорог',
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
