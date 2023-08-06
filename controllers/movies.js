const Movie = require('../models/movie');

const getMovies = (req, res) => {
  console.log(res.movie);
};
const createMovies = (req, res) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => {
      res.send({ data: movie });
    });
};
const deleteMovie = (req, res) => {
  console.log('Запрос есть');
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovie,
};
