const mongoose = require("mongoose");

const sequenceScheme = mongoose.Schema({
  id: { type: String, required: true },
  maxAlbumId: { type: Number },
});

module.exports = mongoose.model("Sequence", sequenceScheme);
