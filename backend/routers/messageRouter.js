const router = require("express").Router();
const { addMessage } = require("../controllers/addMessageController");
const { getMessage } = require("../controllers/getMessageController");

// add message
router.post("/", addMessage);

// get message
router.get("/:conversationId", getMessage);

module.exports = router;
