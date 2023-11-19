const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  date: Date,
  data: [
    {
      name: String,
      artist: String,
      image: String,
      rank: Number,
      last_week_rank: Number,
      peak_rank: Number,
      weeks_on_chart: Number,
    },
  ],
});

const Music = mongoose.model("Music", MusicSchema);

module.exports = Music;
