var Sequence = require("../models/sequence");

var maxAlbumId;

var sequenceId = "";

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxAlbumId = sequence.maxAlbumId;
      maxSongId = sequence.maxSongId;
    })
    .catch((err) => {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    });
}
SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;
  switch (collectionType) {
    case "albums":
      maxAlbumId++;
      updateObject = { maxAlbumId: maxAlbumId };
      nextId = maxAlbumId;
      break;
    case "songs":
      maxSongId++;
      updateObject = { maxSongId: maxSongId };
      nextId = maxSongId;
      break;
    default:
      return -1;
  }
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .then((result) => console.log(result))
    .catch((err) => {
      console.log("nextId error = ", err);
      return null;
    });
  return nextId;
};
module.exports = new SequenceGenerator();
