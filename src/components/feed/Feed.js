import Share from '../share/Share'
import Post from '../post/Post'
import './Feed.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Feed({userID}) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const response = userID ? await axios.get("/posts/profile/"+userID, { withCredentials: true }) : await axios.get('/posts/timeline/allPosts', { withCredentials: true });
            setPosts(response.data);
        };
        fetchPosts();
    }, [userID]);

    return (
        <div className="feedContainer">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}
