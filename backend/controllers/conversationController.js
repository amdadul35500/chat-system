const Conversation = require("../modals/Conversation");

const NewConversation = async (req, res) => {
  if (req.body.senderIId !== req.body.receiverId) {
    try {
      const findExistingConversation = await Conversation.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] },
      });

      if (!findExistingConversation) {
        const newConversation = new Conversation({
          members: [req.body.senderId, req.body.receiverId],
        });
        const saveConversation = await newConversation.save();
        res.status(200).json(saveConversation);
      } else {
        res.status(404).send("Already exist this conversation!");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(404).send("You can't message yourself!");
  }
};

module.exports = {
  NewConversation,
};
