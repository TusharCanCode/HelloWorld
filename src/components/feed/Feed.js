import Share from '../share/Share'
import Post from '../post/Post'
import './Feed.css'

export default function Feed() {
    return (
        <div className="feedContainer">
            <div className="feedWrapper">
                <Share />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}
