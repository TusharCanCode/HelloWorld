import Share from '../share/Share'
import Post from '../post/Post'
import './Feed.css'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext'

export default function Feed({ userID }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        async function fetchPosts() {
            const response = userID ? await axios.get("/posts/profile/" + userID, { withCredentials: true }) : await axios.get('/posts/timeline/allPosts', { withCredentials: true });
            setPosts(response.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt);
            }));
        };
        fetchPosts();
    }, [userID]);

    return (
        <div className="feedContainer">
            <div className="feedWrapper">
                {userID ? userID === user._id && <Share setPosts={setPosts} posts={posts} /> : <Share setPosts={setPosts} posts={posts} />}
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}
