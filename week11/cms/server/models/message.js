const mongoose = request("mongoose");

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String, required: true },
  msgText: { type: String, required: false },
  sender: { type: String, required: false },
});

module.exports = mongoose.model("Message", messageSchema);
