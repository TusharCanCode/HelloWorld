const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Create a new post
router.post('/createPost', fetchUser, async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const post = await Post.create(req.body);
        res.status(200).json(post);

    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ error: errors });
    }
})

//Route-2: Update an existing post
router.put('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Not Found" } });

        if (post.userId.toString() !== req.user.id)
            return res.status(403).json({ error: { alert: "You cannot edit this post" } });

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json(updatedPost);

    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ error: errors });
    }
});

//Route-3: Deleting an existing post
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Not Found" } });

        if (post.userId.toString() !== req.user.id)
            return res.status(403).json({ error: { alert: "You cannot delete this post" } });

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: { alert: "Post has been deleted successfully" } });

    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Route-4: Like/Dislike an existing post
router.put('/:id/likeDislike', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Not Found" } });

        if (post.likes.includes(req.user.id)) {
            await post.updateOne({ $pull: { likes: req.user.id } });
            return res.status(200).json({ message: { alert: "The post has been disliked" } });
        }

        await post.updateOne({ $push: { likes: req.user.id } });
        return res.status(200).json({ message: { alert: "The post has been liked" } });

    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Route-5: Fetching an existing post
router.get('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Not Found" } });

        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Route-6: Getting timline posts
router.get('/timeline/allPosts', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: { alert: "Not Found" } });

        const userPosts = await Post.find({ userId: user.id });
        const friendPosts = await Promise.all(
            user.following.map((Id) => {
                return Post.find({ userId: Id });
            })
        );

        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})

//Utility Functions
function handleErrors(err) {
    const errors = { userId: '', decription: '', alert: '' };
    if (err.message.includes("Post validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports = router;