const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Masker Model
const Masker = require('../../models/Masker');

// @route   GET api/masker
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Masker.find()
    .sort({ date: -1 })
    .then((masker) => res.json(masker))
});

// @route   POST api/masker
// @desc    Post an Item
// @access  Public
router.post('/', auth, (req, res) => {
  const newItem = new Masker({
    description: req.body.description,
    accuracy: req.body.accuracy
  });

  newItem.save().then((masker) => res.json(masker));
});

module.exports = router;
