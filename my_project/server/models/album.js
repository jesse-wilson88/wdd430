const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  id: { type: String },
  artist: { type: String, required: true },
  title: { type: String, required: true },
  albumCoverUrl: { type: String, required: false },
  releaseDate: { type: String, required: false },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
});

module.exports = mongoose.model("Album", albumSchema);
