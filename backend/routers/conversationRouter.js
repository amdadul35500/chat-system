const router = require("express").Router();
const { NewConversation } = require("../controllers/conversationController");
const { getConversation } = require("../controllers/getConversationController");
const {
  getTowUserConversation,
} = require("../controllers/getTowUserConversationController");

// new conversation
router.post("/", NewConversation);

// get conversation of a login user
router.get("/:userId", getConversation);

// get conversation into two user
router.get("/find/:firstUserId/:secondUserId", getTowUserConversation);

module.exports = router;
