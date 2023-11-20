const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  name: String,
  artist: String,
  image: String,
  genre: String,
});

const Music = mongoose.model("Music", MusicSchema);

module.exports = Music;
