const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  picture: String,
  description: String,
  station: String,
  following: Array,
  followers: Array,
  recordings: Array,
  comments: Array,
  tagline: String,
  description: String,
  picture: String,
  station: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;