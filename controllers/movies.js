const Movie = require('../models/movie');

const getMovies = (req, res) => {
  console.log(res.movie);
};
const createMovies = (req, res) => {
  console.log('Запрос есть');
};
const deleteMovie = (req, res) => {
  console.log('Запрос есть');
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovie,
};
