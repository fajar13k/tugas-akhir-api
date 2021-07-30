import { Schema, model } from 'mongoose';

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

const Masker = model('masker', MaskerSchema);

export default Masker;
