const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');

// Masker Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { username, password, name } = req.body;

  // Simple validation
  if (!username || !password || !name) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ username })
    .then((user) => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        username,
        password,
        name
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save()
            .then((user) => {
              res.json({
                user: {
                  id: user.id,
                  name: user.name,
                  username: user.username
                }
              });
            });
        })
      })
    })
});

module.exports = router;
