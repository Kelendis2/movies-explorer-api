const { ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
// Импорт авторских ошибок

const BadRequest = require('../utils/errors/BadRequest');

const NotFound = require('../utils/errors/NotFound');
const Forbidden = require('../utils/errors/Forbidden');
const { STATUS_OK } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res
        .status(STATUS_OK)
        .send(movies);
    })
    .catch(next);
};
const createMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(new NotFound('Фильм с указанным id не найдена'))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new Forbidden('У пользователя нет возможности удалять фильмы других пользователей'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм успешно удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovie,
};
