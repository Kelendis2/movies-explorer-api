const router = require('express').Router();

const { getMovies, createMovies, deleteMovie } = require('../controllers/movies');
const { validateNewMovie, validateMovieId } = require('../utils/validate');

router.get('/', getMovies);
router.post('/', validateNewMovie, createMovies);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
