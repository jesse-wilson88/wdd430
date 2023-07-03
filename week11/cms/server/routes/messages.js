var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");

const Message = require("../models/message");

router.get("/", (req, res, next) => {
  Message.find()
    .populate("sender")
    .then((messages) => {
      this.messages = messages;
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred occurred while trying to fetch messages!",
        error: error,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Message.findOne({
    id: req.params.id,
  })
    .populate("sender")
    .then((message) => {
      res.status(200).json({
        message: "Message fetched successfully!",
        message: message,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred while trying to fetch a message!",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        message: createdMessage,
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
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgtext;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
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
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully",
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
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

module.exports = router;
