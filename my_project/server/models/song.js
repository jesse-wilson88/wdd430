const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  id: { type: String, required: true },
  artist: { type: String, required: false },
  title: { type: String, required: true },
  album: { type: String, required: false },
  videoUrl: { type: String, required: false },
});

module.exports = mongoose.model("Song", songSchema);
