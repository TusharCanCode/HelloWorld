import './Message.css';
import React from 'react';
import { format } from 'timeago.js';

export default function Message({ message, own }) {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img src="https://imgix.ranker.com/user_node_img/69/1374288/original/killua-zaoldyeck-photo-u21?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375" alt="" className="messageImage" />
                <p className='messageText'>{message.message}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
