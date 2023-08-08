const { ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
// Импорт авторских ошибок
const {
  NOT_FOUND_ID_ERROR,
  FORBIDDEN_ERROR,
  BAD_REQUEST_ERROR,
  STATUS_OK,
} = require('../utils/constants');
const BadRequest = require('../utils/errors/BadRequest');
const NotFound = require('../utils/errors/NotFound');
const Forbidden = require('../utils/errors/Forbidden');

// Контроллер запроса фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res
        .status(STATUS_OK)
        .send(movies);
    })
    .catch(next);
};
// Контроллер создания фильма в избранном
const createMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
// Контроллер удаление фильма из избранного
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new Forbidden(FORBIDDEN_ERROR));
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
