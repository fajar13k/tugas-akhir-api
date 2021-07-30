const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth/login
// @desc    Auth user
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 7200 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  username: user.username
                }
              });
            }
          )
        })
    });
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
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
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 7200 },
                (err, token) => {
                  if (err) throw err;

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      username: user.username
                    }
                  });
                }
              )
            });
        })
      })
    })
});

// @route   POST api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user))
});

module.exports = router;
