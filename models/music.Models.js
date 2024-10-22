const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  singer: {
    type: String,
    required: true
  },
  song: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

const Music = mongoose.model('Music', musicSchema);
module.exports = Music;
