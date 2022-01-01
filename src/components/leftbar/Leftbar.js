import { Typography } from '@material-ui/core'
import { Bookmark, ExitToApp, Home, ListAlt, Person, PhotoCamera, PlayCircleOutline, Settings, Storefront, TabletMac } from '@material-ui/icons';
import './Leftbar.css'

export default function Leftbar() {
    return (
        <div className="container">
            <div className="item">
                <Home className="icon" />
                <Typography className="text">Home</Typography>
            </div>
            <div className="item">
                <Person className="icon" />
                <Typography className="text">Friends</Typography>
            </div>
            <div className="item">
                <ListAlt className="icon" />
                <Typography className="text">Lists</Typography>
            </div>
            <div className="item">
                <PhotoCamera className="icon" />
                <Typography className="text">Camera</Typography>
            </div>
            <div className="item">
                <TabletMac className="icon" />
                <Typography className="text">Apps</Typography>
            </div>
            <div className="item">
                <PlayCircleOutline className="icon" />
                <Typography className="text">Videos</Typography>
            </div>
            <div className="item">
                <Bookmark className="icon" />
                <Typography className="text">Collections</Typography>
            </div>
            <div className="item">
                <Storefront className="icon" />
                <Typography className="text">Market Place</Typography>
            </div>
            <div className="item">
                <Settings className="icon" />
                <Typography className="text">Settings</Typography>
            </div>
            <div className="item">
                <ExitToApp className="icon" />
                <Typography className="text">Logout</Typography>
            </div>
        </div>
    )
}
