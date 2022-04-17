import { Comment, MoreVert, Share, ThumbUpAlt } from '@material-ui/icons'
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Post.css'

export default function Post({ post }) {
    const assets = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`/users/${post.userId}`, { withCredentials: true });
            setUser(response.data);
            console.log(response.data);
        };
        fetchUser();
    }, [post.userId]);
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
                        <ThumbUpAlt className="postBottomIcon mr-8" />
                        <span className="postBottomTexts">69 Likes</span>
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
