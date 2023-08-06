const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, email, password,
  } = req.body;
  User.create({ name, email, password })
    .then((user) => {
      res.send({ data: user });
    });
};

const getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res) => {
  console.log('Запрос есть');
};

module.exports = {
  getUser,
  updateUser,
  createUser,
};
