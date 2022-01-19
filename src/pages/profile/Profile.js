import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import './Profile.css'
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
    return (
        <>
            <Navbar />
            <div className='profileContainer'>
                <div className="profileTop">
                    <div className="profileCover">
                        <div className="profileCoverWrapper">
                            <img className="profileCoverImage" src="https://i.pinimg.com/736x/db/12/9d/db129ddf0cbbcf67f69a2cf101d87cc3.jpg" alt="Profile Cover" />
                            <h2 className="userDescription">"I am bored"</h2>
                            <div className="profileDescription">
                                <img className="profileImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="profile" />
                                <div className="profileAbout">
                                    <h2>Tushar Bharti</h2>
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
                            <Feed />
                        </div>
                        <div className="profileBottomRight">
                            <Rightbar profile />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
