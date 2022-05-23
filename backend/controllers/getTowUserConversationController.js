const Conversation = require("../modals/Conversation");

const getTowUserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTowUserConversation,
};
