const Message = require("../modals/Message");

const addMessage = async (req, res) => {
  const message = new Message(req.body);
  global.io.emit("sendFromBackend", req.body);
  try {
    const newMessage = await message.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  addMessage,
};
