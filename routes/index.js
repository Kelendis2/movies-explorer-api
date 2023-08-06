const router = require('express').Router();
const { createUser } = require('../controllers/users');

router.use('/signup', createUser);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
