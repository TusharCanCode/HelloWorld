const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const router = express.Router();

//Route-1: Updating an existing user
router.put('/:id', fetchuser, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            let user = await User.findById(req.user.id);
            if (!user)
                return res.status(404).json({ error: { alert: "Not Found!" } });

            user = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true, runValidators: true });
            return res.status(200).json(user);
        } catch (error) {
            const errors = handleErrors(error);
            return res.status(500).json({ error: errors });
        }
    }
    else
        return res.status(403).json({ error: { alert: "Cannot update this account!" } })
});

//Route-2: Deleting an existing user
router.delete('/:id', fetchuser, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            let user = await User.findByIdAndDelete(req.user.id);
            if (!user)
                return res.status(404).json({ error: { alert: "Not Found" } });

            res.cookie('JWT', '', { httpOnly: true, maxAge: 1, sameSite: "lax" });
            return res.status(200).json({ message: { alert: "Account has been deleted successfully!" } });
        } catch (error) {
            return res.status(500).json({ error: { alert: "Internal Server error" } });
        }
    }
    else
        return res.status(403).json({ error: { alert: "Cannot delete this account!" } })
});

//Route-3: Getting details of an existing user
router.get('/:id', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: { alert: "Not Found" } });

        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (error) {
        return res.status(500).json({ error: { alert: "Internal Server error" } });
    }
});

//Route-4: Following an existing user
router.put('/:id/follow', fetchuser, async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if (!user || !currentUser)
                return res.status(404).json({ error: { alert: "Not Found" } });

            if (user.followers.includes(req.user.id))
                return res.status(403).json({ error: { alert: "You are already following that user" } });

            await currentUser.updateOne({ $push: { following: user.id } });
            await user.updateOne({ $push: { followers: currentUser.id } });
            return res.status(200).json({ message: { alert: "User has been followed" } });
        } catch (error) {
            return res.status(500).json({ error: { alert: "Internal Server error" } });
        }
    }
    else
        return res.status(403).json({ error: { alert: "You cannot follow yourself" } })
});

//Route-4: Unfollow an existing user
router.put('/:id/unfollow', fetchuser, async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if (!user.followers.includes(req.user.id))
                return res.status(403).json({ error: { alert: "You don't follow that user" } });

            await currentUser.updateOne({ $pull: { following: user.id } });
            await user.updateOne({ $pull: { followers: currentUser.id } });
            return res.status(200).json({ message: { alert: "User has been unfollowed" } });
        } catch (error) {
            return res.status(500).json({ error: { alert: "Internal Server error" } });
        }
    }
    else
        return res.status(403).json({ error: { alert: "You cannot unfollow yourself" } })
});

//Route-5: Current User
router.get('/', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: { alert: "Not Found" } });

        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (error) {
        return res.status(500).json({ error: { alert: "Internal Server error" } });
    }
});

//Route-6: Getting an user's followings
router.get('/followings/:id', fetchuser, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId);
            })
        )

        let friendList = [];
        friends.map(friend=>{
            const {firstName, lastName, profilePicture, _id} = friend;
            friendList.push({firstName, lastName, profilePicture, _id});
        })
        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json({ error: { alert: "Internal Server error" } });
    }
});

//Route-7: Getting an user's followers
router.get('/followers/:id', fetchuser, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.followers.map(friendId=>{
                return User.findById(friendId);
            })
        )

        let friendList = [];
        friends.map(friend=>{
            const {firstName, lastName, profilePicture, _id} = friend;
            friendList.push({firstName, lastName, profilePicture, _id});
        })
        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json({ error: { alert: "Internal Server error" } });
    }
});

//Utility Functions
function handleErrors(err) {
    const errors = { firstName: '', lastName: '', userName: '', email: '', password: '', rePassword: '', alert: '' };
    if (err.message.includes("Validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.code === 11000)
        errors.alert = "User already exists";

    return errors;
}

module.exports = router;