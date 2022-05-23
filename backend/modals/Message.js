const mongoose = require("mongoose");

const messageShema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    conversationId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageShema);
