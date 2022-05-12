import { Comment, Favorite, FavoriteBorder, MoreVert, Share } from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Post.css'
import { Checkbox } from '@material-ui/core';
import { AuthContext } from '../../Context/AuthContext'

export default function Post({ post }) {
    const [totalLikes, setTotalLikes] = useState(post.likes.length);
    const assets = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (post.likes.includes(currentUser._id))
            setLiked(true);
    }, [currentUser._id, post.likes])


    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`/users/${post.userId}`, { withCredentials: true });
            setUser(response.data);
            console.log(response.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        console.log("wtf");
        try {
            await axios.put(`/posts/${post._id}/likeDislike`, { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
        setTotalLikes(liked ? totalLikes - 1 : totalLikes + 1);
        setLiked(!liked);
    }

    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user._id}`}>
                            <img className="postProfile" src={user.profilePicture ? user.profilePicture : assets + 'NoProfilePic.png'} alt="profile" />
                        </Link>
                        <span className="postUsername">{user.firstName + ' ' + user.lastName}</span>
                        <span className="postDuration">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postMiddle">
                    <span className="postText" style={(post.image) ? {} : { fontSize: '20px' }}>{post.description}</span>
                    {post.image && <img src={post.image} alt="Post" className="postImage" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomContents">
                        <Checkbox checked={liked} color='secondary' icon={<FavoriteBorder color="secondary" />} checkedIcon={<Favorite />} onClick={likeHandler} />
                        <span className="postBottomTexts">{`${totalLikes} Likes`}</span>
                    </div>
                    <div className="postBottomContents" >
                        <Comment className="postBottomIcon mr-8" />
                        <span className="postBottomTexts">10 Comments</span>
                    </div>
                    <div className="postBottomContents">
                        <Share className="postBottomIcon mr-8" />
                        <span className="postBottomTexts">12 Shares</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
