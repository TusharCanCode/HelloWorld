import { ImageList, ImageListItem } from '@material-ui/core'
import './Rightbar.css'

export default function Rightbar() {
    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImage" src="/gift-box.svg" alt='giftbox' />
                    <span className="birthdayText">
                        <b>Sparsh Gupta</b> and <b>10 others</b> have their birthday today.
                    </span>
                </div>

                <div className="onlineFriends">
                    <h3 className="onlineFriendsTitle">Online Friends</h3>
                    <ul className="onlineFriendsList">
                        <li className="onlineFriend">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="Online Friend" className="onlineFriendImage" />
                            <span className="onlineFriendUsername">Sparsh Gupta</span>
                        </li>
                        <li className="onlineFriend">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="Online Friend" className="onlineFriendImage" />
                            <span className="onlineFriendUsername">Sparsh Gupta</span>
                        </li>
                        <li className="onlineFriend">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="Online Friend" className="onlineFriendImage" />
                            <span className="onlineFriendUsername">Sparsh Gupta</span>
                        </li>
                    </ul>
                </div>

                <hr className="onlineFriendBorder" />

                <div className="gallery">
                    <h3 className="galleryTitle">Gallery</h3>
                    <ImageList sx={{ width: 450, height: 400 }} cols={2} rowHeight={164} style={{marginTop: 15}}>
                            <ImageListItem>
                                <img
                                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Gallery"
                                    loading="lazy"
                                />
                            </ImageListItem>
                            <ImageListItem>
                                <img
                                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Gallery"
                                    loading="lazy"
                                />
                            </ImageListItem>
                            <ImageListItem>
                                <img
                                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" alt="Gallery"
                                    loading="lazy"
                                />
                            </ImageListItem>
                    </ImageList>
                </div>

            </div>
        </div>
    )
}
