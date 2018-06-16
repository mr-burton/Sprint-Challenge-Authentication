const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'europe is my favorite country, i like cold weather!';


function generateToken(user) {
  const options = {
    expiresIn: '40m',
  }
  const payload = { name: user.username };
  return jwt.sign(payload, secret, options);
}

const createUser = (req, res) => {
  const { username, password } = req.body;
  // create user takes in the username and password and saves a user.
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.
  User
    .create({ username, password })
    .then(response => {
      const token = generateToken(user);
      res.status(201).json({ data: response })
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = {
  createUser
};
