import './Navbar.css';
import { Search, Person, Notifications, Chat } from '@material-ui/icons';
import { Badge, InputBase } from '@material-ui/core';

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbarIcon">
                <span className="icon">
                    <span className="iconLeft">Hello</span>
                    <span className="iconRight">World</span>
                </span>
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
                    <Badge badgeContent={50} color='secondary' className='navbarIconItem'>
                        <Person />
                    </Badge>
                    <Badge badgeContent={50} color='secondary' className='navbarIconItem'>
                        <Notifications />
                    </Badge>
                    <Badge badgeContent={50} color='secondary' className='navbarIconItem'>
                        <Chat />
                    </Badge>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="profile" />
            </div>
        </div>
    )
}
