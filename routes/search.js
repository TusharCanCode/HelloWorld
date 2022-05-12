const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const router = express.Router();

//Route-1: Updating an existing user
router.post('/user', fetchuser, async (req, res) => {
    try {
        const users = await User.find({ $or: [{ 'userName': new RegExp(req.body.search, 'i') }, { 'firstName': new RegExp(req.body.search, 'i') }, { 'lastName': new RegExp(req.body.search, 'i') }] });
        console.log(req.body);
        let userList = [];
        users.map(user => {
            const { _id, profilePicture, firstName, lastName } = user;
            userList.push({ _id, profilePicture, firstName, lastName });
        })
        return res.status(200).json(userList);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;