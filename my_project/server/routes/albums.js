var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");

const Album = require("../models/album");

router.get("/", (req, res, next) => {
  Album.find()
    .populate("songs")
    .then((albums) => {
      this.albums = albums;
      res.status(200).json({
        message: "Albums fetched successfully!",
        albums: this.albums,
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
  Album.findOne({
    id: req.params.id,
  })
    .populate("songs")
    .then((album) => {
      res.status(200).json({
        message: "Album fetched successfully!",
        album: album,
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
  const maxAlbumId = sequenceGenerator.nextId("albums");

  const album = new Album({
    id: maxAlbumId,
    artist: req.body.artist,
    title: req.body.title,
    albumCoverUrl: req.body.albumCoverUrl,
    releaseDate: req.body.releaseDate,
    songs: req.body.songs,
  });

  album
    .save()
    .then((createdAlbum) => {
      res.status(201).json({
        message: "Album added successfully",
        album: createdAlbum,
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
  Album.findOne({ id: req.params.id })
    .populate("songs")
    .then((album) => {
      album.artist = req.body.artist;
      album.title = req.body.title;
      album.albumCoverUrl = req.body.albumCoverUrl;
      album.releaseDate = req.body.releaseDate;
      album.songs = req.body.songs;

      Album.updateOne({ id: req.params.id }, album)
        .then((result) => {
          res.status(204).json({
            message: "Album updated successfully",
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
        message: "Album not found.",
        error: { album: "Album not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Album.findOne({ id: req.params.id })
    .populate("songs")
    .then((album) => {
      Album.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Album deleted successfully",
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
        message: "Album not found.",
        error: { album: "Album not found" },
      });
    });
});

module.exports = router;
