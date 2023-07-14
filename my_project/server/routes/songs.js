var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");

const Song = require("../models/song");

router.get("/", (req, res, next) => {
  Song.find()
    // .populate("songs")
    .then((songs) => {
      this.songs = songs;
      res.status(200).json({
        message: "Songs fetched successfully!",
        songs: this.songs,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred!",
        error: error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Song.findOne({
    id: req.params.id,
  })
    // .populate("songs")
    .then((song) => {
      res.status(200).json({
        message: "Song fetched successfully!",
        song: song,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred!",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxSongId = sequenceGenerator.nextId("songs");

  const song = new Song({
    id: maxSongId,
    artist: req.body.artist,
    title: req.body.title,
    album: req.body.album,
    videoUrl: req.body.videoUrl,
    // songs: req.body.songs,
  });

  song
    .save()
    .then((createdSong) => {
      res.status(201).json({
        message: "Song added successfully",
        song: createdSong,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Song.findOne({ id: req.params.id })
    // .populate("songs")
    .then((song) => {
      song.artist = req.body.artist;
      song.title = req.body.title;
      song.album = req.body.album;
      song.videoUrl = req.body.videoUrl;
      // song.songs = req.body.songs;

      Song.updateOne({ id: req.params.id }, song)
        .then((result) => {
          res.status(204).json({
            message: "Song updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Song not found.",
        error: { song: "Song not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Song.findOne({ id: req.params.id })
    // .populate("songs")
    .then((song) => {
      Song.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Song deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Song not found.",
        error: { song: "Song not found" },
      });
    });
});

module.exports = router;
