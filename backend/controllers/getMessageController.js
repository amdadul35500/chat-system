const Message = require("../modals/Message");

const getMessage = async (req, res, next) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getMessage,
};
