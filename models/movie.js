// Импорт пакетов
const mongoose = require('mongoose');
const validator = require('validator');
const { VALIDATION_URL_ERROR } = require('../utils/constants');

// Определение схемы фильмов
const movieSchema = new mongoose.Schema({
  country: { // обязательное поле страна создания фильма: строка
    type: String,
    required: true,
  },
  director: { // обязательное поле режиссер фильма: строка
    type: String,
    required: true,
  },
  duration: { // обязательное поле продолжительность фильма: строка
    type: Number,
    required: true,
  },
  year: { // обязательное поле год выпуска фильма: строка
    type: String,
    required: true,
  },
  description: { // обязательное поле описание фильма: строка
    type: String,
    required: true,
  },
  image: { // обязательное поле ссылка на постер к фильму: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: VALIDATION_URL_ERROR,
    },
  },
  trailerLink: { // обязательное поле ссылка на трейлер фильма: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: VALIDATION_URL_ERROR,
    },
  },
  thumbnail: { // обязательное поле миниатюрное изображение постера к фильму: строка, URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: VALIDATION_URL_ERROR,
    },
  },
  owner: { // обязательное поле _id пользователя, который сохранил фильм: из схемы потльзователя
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // обязательное поле id фильма, из ответа сервиса MoviesExplorer: число
    type: Number,
    required: true,
  },
  nameRU: { // обязательное поле название фильма на русском языке: строка
    type: String,
    required: true,
  },
  nameEN: { // обязательное поле название фильма на английском языке: строка
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
