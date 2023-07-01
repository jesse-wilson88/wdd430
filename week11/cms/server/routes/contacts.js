var express = require("express");
var router = express.Router();
var SequenceGenerator = require("./sequenceGenerator");

let contacts = [];

const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      this.contacts = contacts;
      res.status(200).json({
        message: "Contacts fetched successfully!",
        contacts: this.contacts,
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
  Contact.findOne({
    id: req.params.id,
  })
    .populate("group")
    .then((contact) => {
      res.status(200).json({
        message: "Contact fetched successfully!",
        contact: contact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred!",
        error: error,
      });
    });
});

// router.post("/", (req, res, next) => {});

// router.put("/:id", (req, res, next) => {});

// router.delete("/:id", (req, res, next) => {});

module.exports = router;
