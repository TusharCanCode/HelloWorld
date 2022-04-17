import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import './Profile.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core';

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
    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`/users/${userID}`, { withCredentials: true });
            setUser(response.data);
        };
        fetchUser();
    }, [userID]);
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
