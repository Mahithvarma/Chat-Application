const { addMessage, getAllMsgs } = require("../controllers/messageController");

const router = require("express").Router();
router.post("/addmsg", addMessage);
router.get("/getmsgs", getAllMsgs);

module.exports = router;