const { addMessage, getAllMsgs } = require("../controllers/messageController");

const router = require("express").Router();
router.post("/addmsg", addMessage);
router.post("/getmsgs", getAllMsgs);

module.exports = router;