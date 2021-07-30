import { Schema, model } from 'mongoose';

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
})

const User = model('user', UserSchema);

export default User;
