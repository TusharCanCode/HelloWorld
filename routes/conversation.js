const router = require('express').Router();
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Create a new conversation
router.post('/', fetchUser, async (req, res) => {
    if (req.user.id === req.body.firstID || req.user.isAdmin) {
        try {
            const conversations = await Conversation.findOne({
                users: { $all: [req.body.firstID, req.body.secondID], }
            });

            if (!conversations) 
            {
                const conversation = await Conversation.create({
                    users: [req.body.firstID, req.body.secondID]
                });
                return res.status(200).json(conversation)
            }
            else
                return res.status(200).json({});

        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return res.status(403).json({ error: { alert: "Cannot create the conversations!" } })
    }
})

//Route-2: Fetching an existing conversation
router.get('/:userID', fetchUser, async (req, res) => {
    if (req.user.id === req.params.userID || req.user.isAdmin) {
        try {
            const conversations = await Conversation.find({
                users: { $in: [req.params.userID], }
            });
            return res.status(200).json(conversations);

        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return res.status(403).json({ error: { alert: "Cannot fetch the conversations!" } })
    }
});

//Route-3: Fetching conversation between two user Id's
router.get('/find/:firstUserId/:secondUserId', fetchUser, async (req, res) => {
    if (req.user.id === req.params.secondUserId || req.user.isAdmin) {
        try {
            const conversations = await Conversation.findOne({
                users: { $all: [req.params.firstUserId, req.params.secondUserId], }
            });
            return res.status(200).json(conversations);

        } catch (error) {
            return res.status(500).json({ error });
        }
    } else {
        return res.status(403).json({ error: { alert: "Cannot fetch the conversations!" } })
    }
})

module.exports = router;