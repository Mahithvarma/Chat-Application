const User = require("../model/userModel");
const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = messageModel.create({
            message: { text: message},
            users: [from, to],
            sender: from,
        });

        if(data) res.json({ status: true, msg: "Message added successfully." });
        else res.json({ status: false, msg: "Failed to add the Message." });
    } catch (err) {
        next(err);
    }
};

module.exports.getAllMsgs = async (req, res, next) => {

};