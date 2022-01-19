import { ImageList, ImageListItem } from '@material-ui/core'
import Online from '../online/Online'
import './Rightbar.css'

export default function Rightbar({ profile }) {
    const HomePageRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImage" src="/gift-box.svg" alt='giftbox' />
                    <span className="birthdayClose">x</span>
                    <span className="birthdayText">
                        <b>Sparsh Gupta</b> and <b>10 others</b> have their birthday today.
                    </span>
                </div>

                <div className="onlineFriends">
                    <h2 className="onlineFriendsTitle">Online Friends</h2>
                    <ul className="onlineFriendsList">
                        <Online />
                        <Online />
                        <Online />
                    </ul>
                </div>

                <hr className="rightbarBorder" />

                <div className="gallery">
                    <h2 className="galleryTitle">Gallery</h2>
                    <ImageList sx={{ width: 450, height: 400 }} cols={2} rowHeight={164} style={{ marginTop: 15 }}>
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
            </>
        )
    };

    const ProfilePageRightbar = () => {
        return (
            <>
                <div className="userInfo">
                    <h2 className='userInfoTitle'>User Information</h2>
                    <div className="userDatasets">
                        <span className="userDatasetKey">Name:</span>
                        <span className="userDatasetValue">Tushar Bharti</span>
                    </div>
                    <div className="userDatasets">
                        <span className="userDatasetKey">From:</span>
                        <span className="userDatasetValue">India</span>
                    </div>
                    <div className="userDatasets">
                        <span className="userDatasetKey">City:</span>
                        <span className="userDatasetValue">New Delhi</span>
                    </div>
                    <div className="userDatasets">
                        <span className="userDatasetKey">Relationship:</span>
                        <span className="userDatasetValue">Single</span>
                    </div>
                </div>
                <hr className="rightbarBorder" />
                <div className="userFriendsList">
                    <h2 className="userFriendsTitle">Friends</h2>
                    <div className="userFriendListWrapper">
                        <div className="userFriend">
                            <img className="userFriendImage" src="https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375" alt="Friend" />
                            <span className="userFriendName">Killua Zoldyck</span>
                        </div>
                        <div className="userFriend">
                            <img className="userFriendImage" src="https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375" alt="Friend" />
                            <span className="userFriendName">Killua Zoldyck</span>
                        </div>
                        <div className="userFriend">
                            <img className="userFriendImage" src="https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375" alt="Friend" />
                            <span className="userFriendName">Killua Zoldyck</span>
                        </div>
                        <div className="userFriend">
                            <img className="userFriendImage" src="https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375" alt="Friend" />
                            <span className="userFriendName">Killua Zoldyck</span>
                        </div>
                        <div className="userFriend">
                            <img className="userFriendImage" src="https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375" alt="Friend" />
                            <span className="userFriendName">Killua Zoldyck</span>
                        </div>
                    </div>
                </div>
                <hr className="rightbarBorder" />
                <div className="gallery">
                    <h2 className="galleryTitle">Gallery</h2>
                    <ImageList sx={{ width: 450, height: 400 }} cols={2} rowHeight={164} style={{ marginTop: 15 }}>
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
            </>
        )
    };

    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {
                    profile ? <ProfilePageRightbar /> : <HomePageRightbar />
                }
            </div>
        </div>
    )
}
