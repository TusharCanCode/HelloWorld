const router = require('express').Router();
const mongoose = require('mongoose');
const Message = require('../models/Message');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Create a new message
router.post('/', fetchUser, async (req, res) => {
    try {
        req.body.senderID = req.user.id;
        req.body.conversationID = mongoose.Types.ObjectId(req.body.conversationID);
        const newMessage = await Message.create(req.body);
        res.status(200).json(newMessage);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

//Route-2: Find existing messages
router.get('/:conversationID', fetchUser, async (req, res) => {
    try {
        req.params.conversationID = mongoose.Types.ObjectId(req.params.conversationID);
        const messages = await Message.find({
            conversationID: req.params.conversationID
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});

module.exports = router;