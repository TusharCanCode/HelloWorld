import { EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import './Share.css'

export default function Share() {
    return (
        <div className='shareContainer'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="profile" />
                    <input className="shareInput" placeholder="Let your thoughts spread Tushar" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="lime" className="shareOptionIcon" />
                            <span className="shareOptionText">Photo/Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="rgb(51, 153, 255)" className="shareOptionIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="tomato" className="shareOptionIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareOptionIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        <button className="shareOptionButton" type="submit">Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
