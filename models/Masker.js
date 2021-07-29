const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Buat skema
const MaskerSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Masker = mongoose.model('masker', MaskerSchema);
