import { Comment, MoreVert, Share, ThumbUpAlt } from '@material-ui/icons'

import './Post.css'

export default function Post() {
    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="profile" />
                        <span className="postUsername">Tushar Bharti</span>
                        <span className="postDuration">11 hours ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postMiddle">
                    <span className="postText">This is my very first post ;)</span>
                    <img src="https://spoilerguy.com/wp-content/uploads/2021/05/attack-on-titan-1258846-1280x0-1.jpeg" alt="Post" className="postImage" />
                </div>
                <div className="postBottom">
                    <div className="postBottomContents">
                        <ThumbUpAlt className="postLike mr-8"/>
                        <span className="postBottomTexts">69 Likes</span>
                    </div>
                    <div className="postBottomContents" >
                        <Comment className="postComment mr-8" />
                        <span className="postBottomTexts">10 Comments</span>
                    </div>
                    <div className="postBottomContents">
                        <Share className="postShare mr-8" />
                        <span className="postBottomTexts">12 Shares</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
