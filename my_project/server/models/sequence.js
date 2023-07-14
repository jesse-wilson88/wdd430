const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  id: { type: String, required: true },
  maxAlbumId: { type: Number },
  maxSongId: { type: Number },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
