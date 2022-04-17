import './Navbar.css';
import { Search, Person, Notifications, Chat } from '@material-ui/icons';
import { Badge, InputBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="navbarContainer">
            <div className="navbarIcon">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className="icon">
                        <span className="iconLeft">Hello</span>
                        <span className="iconRight">World</span>
                    </span>
                </Link>
            </div>
            <div className="navbarSearch">
                <Search className='searchIcon' />
                <InputBase placeholder='Search for friends, posts or videos' className='searchInput' />
            </div>
            <div className="navbarOptions">
                <div className="navbarLinks">
                    <span className="navbarLink">Homepage</span>
                    <span className="navbarLink">Timeline</span>
                </div>
                <div className="navbarIcons">
                    <span className="navbarIconItem">
                        <Badge badgeContent={50} color='secondary' >
                            <Person />
                        </Badge>
                    </span>
                    <span className="navbarIconItem">
                        <Badge badgeContent={50} color='secondary' >
                            <Notifications />
                        </Badge>
                    </span>
                    <span className="navbarIconItem">
                        <Link to="/chat">
                            <Badge badgeContent={50} color='secondary' >
                                <Chat />
                            </Badge>
                        </Link>
                    </span>
                </div>
                <Link to={`/profile/${user._id}`}>
                    <img className="navProfilePic" src={user.profilePicture ? user.profilePicture : PF + 'NoProfilePic.png'} alt="profile" />
                </Link>
            </div >
        </div >
    )
}
