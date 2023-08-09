const router = require('express').Router();
const { validateUserCreate, validateUserUpdate } = require('../utils/validate');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', validateUserCreate, getCurrentUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
