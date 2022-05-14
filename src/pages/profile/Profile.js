import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import './Profile.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { AuthContext } from '../../Context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import { follow, unfollow } from '../../API';

const styles = makeStyles((theme) => createStyles({
    avatar: {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'white',
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    }
}));
export default function Profile() {
    const classes = styles();
    const assets = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const userID = useParams().userID;
    const { user: currentUser, dispatch, isFetching } = useContext(AuthContext);
    const [followed, setFollowed] = useState(false);
    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`/users/${userID}`, { withCredentials: true });
            setUser(response.data);
        };
        userID && fetchUser();
    }, [userID]);

    useEffect(() => {
        userID && currentUser && setFollowed(currentUser.following.includes(userID));
    }, [userID, currentUser])

    const handleClick = async () => {
        if (!isFetching) {
            if (followed)
                unfollow(userID, dispatch);
            else
                follow(userID, currentUser._id, dispatch);
        }
    }
    console.log("followed: ", followed);
    return (
        <>
            <Navbar />
            <div className='profileContainer'>
                <div className="profileTop">
                    <div className="profileCover">
                        <div className="profileCoverWrapper">
                            <img className="profileCoverImage" src={user.coverPicture ? user.coverPicture : assets + 'NoCoverPic.jpg'} alt="Profile Cover" />
                            <h2 className="userDescription">{user.description ? `"${user.description}"` : ''}</h2>
                            <div className="profileDescription">
                                <div className="profileAboutContent">
                                    <img className="profileImage" src={user.profilePicture ? user.profilePicture : assets + 'NoProfilePic.png'} alt="profile" />
                                    <div className="profileAbout">
                                        <h2>{user.firstName + ' ' + user.lastName}</h2>
                                        <h5>8 Friends</h5>
                                        <AvatarGroup classes={{ avatar: classes.avatar }} max={4}>
                                            <Avatar alt="Remy Sharp" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Remy Sharp" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Remy Sharp" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Remy Sharp" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Remy Sharp" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Travis Howard" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Cindy Baker" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                            <Avatar alt="Agnes Walker" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                                        </AvatarGroup>
                                    </div>
                                </div>
                                {
                                    userID !== currentUser._id &&
                                    (followed ?
                                        <div className="followUser" onClick={handleClick} >
                                            {isFetching ? <CircularProgress color='inherit' size='20px' /> : <>Unfollow <Remove /></>}
                                        </div> :

                                        <div className="followUser" onClick={handleClick}>
                                            {isFetching ? <CircularProgress color='inherit' size='20px' /> : <>Follow <Add /></>}
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileBottom">
                    <div className="profileBottomWrapper">
                        <div className="profileBottomLeft">
                            <Feed userID={userID} />
                        </div>
                        <div className="profileBottomRight">
                            <Rightbar user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
