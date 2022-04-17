const router = require('express').Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Create a new conversation
router.post('/', fetchUser, async (req, res) => {
    try {
        req.body.senderID = req.user.id;
        const conversation = await Conversation.create({
            users: [req.body.senderID, req.body.receiverID]
        });
        res.status(200).json(conversation);

    } catch (error) {
        return res.status(400).json({ error });
    }
})

//Route-2: Fetching an existing conversation
router.get('/:userID', fetchUser, async (req, res) => {
    if (req.user.id === req.params.userID || req.user.isAdmin) {
        try {
            const conversations = await Conversation.find({
                $in: [req.params.userID],
            });
            return res.status(200).json(conversations);

        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return res.status(403).json({ error: { alert: "Cannot fetch the conversations!" } })
    }
});

module.exports = router;