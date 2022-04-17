import './Conversation.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Conversation({ conversation, me, setSelectedConvo }) {
    const assets = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setuser] = useState({});
    useEffect(() => {
        const friend = conversation.users.find(id => id !== me);
        const fetchUser = async () => {
            try {
                const response = await axios.get('users/' + friend, { withCredentials: true });
                setuser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [conversation, me]);

    return (
        <div className='conversation' onClick={() => setSelectedConvo(conversation)}>
            <img src={user.profilePicture ? user.profilePicture : assets + 'NoProfilePic.png'} alt="Friends" className='conversationImage' />
            <div className="conversationName">{user.firstName + ' ' + user.lastName}</div>
        </div>
    )
}
