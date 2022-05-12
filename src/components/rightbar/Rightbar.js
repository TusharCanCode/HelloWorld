import { ImageList, ImageListItem } from '@material-ui/core'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Online from '../online/Online'
import './Rightbar.css'

export default function Rightbar({ user }) {
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    useEffect(() => {
        if (user && user._id) {
            console.log("user: ", user);
            const getFollowings = async () => {
                try {
                    const response = await axios.get('/users/followings/' + user._id, { withCredentials: true });
                    setFollowings(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            const getFollowers = async () => {
                try {
                    const response = await axios.get('/users/followers/' + user._id, { withCredentials: true });
                    setFollowers(response.data);
                } catch (error) {
                    console.log(error);
                }
            }

            getFollowers();
            getFollowings();
        }
    }, [user])
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
                        <span className="userDatasetValue">{user && (user.firstName + ' ' + user.lastName)}</span>
                    </div>
                    <div className="userDatasets">
                        <span className="userDatasetKey">From:</span>
                        <span className="userDatasetValue">{user && (user.from ? user.from : '-')}</span>
                    </div>
                    <div className="userDatasets">
                        <span className="userDatasetKey">City:</span>
                        <span className="userDatasetValue">{user && (user.city ? user.city : '-')}</span>
                    </div>
                    <div className="userDatasets">
                        <span className="userDatasetKey">Relationship:</span>
                        <span className="userDatasetValue">{user && (user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : '-')}</span>
                    </div>
                </div>
                {
                    followers.length > 0 && <>
                        <hr className="rightbarBorder" />
                        <div className="userFriendsList">
                            <h2 className="userFriendsTitle">{`Followers (${followers.length})`}</h2>
                            <div className="userFriendListWrapper">
                                {
                                    followers.map(follower => (
                                        <Link to={`/profile/${follower._id}`} style={{ textDecoration: 'none', color: 'white' }} key={follower._id}>
                                            <div className="userFriend">
                                                <img className="userFriendImage" src={follower.profilePicture ? follower.profilePicture : "https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375"} alt="Friend" />
                                                <span className="userFriendName">{follower.firstName + ' ' + follower.lastName}</span>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                }
                {
                    followings.length > 0 && <>
                        <hr className="rightbarBorder" />
                        <div className="userFriendsList">
                            <h2 className="userFriendsTitle">{`Following (${followings.length})`}</h2>
                            <div className="userFriendListWrapper">
                                {
                                    followings.map(follower => (
                                        <Link to={`/profile/${follower._id}`} style={{ textDecoration: 'none', color: 'white' }} key={follower._id}>
                                            <div className="userFriend">
                                                <img className="userFriendImage" src={follower.profilePicture ? follower.profilePicture : "https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375"} alt="Friend" />
                                                <span className="userFriendName">{follower.firstName + ' ' + follower.lastName}</span>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                }
                {/* <div className="gallery">
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
                </div> */}
            </>
        )
    };

    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {
                    user ? <ProfilePageRightbar /> : <HomePageRightbar />
                }
            </div>
        </div>
    )
}
