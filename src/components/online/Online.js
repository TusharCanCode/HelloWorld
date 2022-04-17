import './Online.css'

export default function Online() {
    return (
        <li className="onlineFriend">
            <div className="onlineFriendImageContent">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="Online Friend" className="onlineFriendImage" />
                <span className="onlineFriendBadge"></span>
            </div>
            <span className="onlineFriendUsername">Sparsh Gupta</span>
        </li>
    )
}