import axios from 'axios'
import { useEffect, useState } from 'react'
import './Online.css'

export default function Online({ selectedConvo, onlineUsers, currentId }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([])
    useEffect(() => {
        setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)));
    }, [onlineUsers, friends])

    useEffect(() => {
        const getFriends = async () => {
            const response = await axios.get('/users/followings/' + currentId, { withCredentials: true });
            setFriends(response.data);
        }
        currentId && getFriends();
    }, [currentId])

    const handleClick = async(userId) =>{
        try {
            const response = await axios.get(`/conversations/find/${userId}/${currentId}`, {withCredentials: true});
            selectedConvo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {onlineFriends.map(online => (
                <div className="onlineFriend" key={online._id} onClick={()=>handleClick(online._id)} style={{cursor: 'pointer'}}>
                    <div className="onlineFriendImageContent">
                        <img src={online.profilePicture ? online.profilePicture : PF + 'NoProfilePic.png'} alt="Online Friend" className="onlineFriendImage" />
                        <span className="onlineFriendBadge"></span>
                    </div>
                    <span className="onlineFriendUsername">{online.firstName + ' ' + online.lastName}</span>
                </div>
            ))}
        </>
    )
}
