import './Chat.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Online from '../../components/online/Online';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

export default function Chat() {
    const { user } = useContext(AuthContext);
    const [conversation, setConversation] = useState([]);
    const [selectedConvo, setSelectedConvo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const LastMessage = useRef();
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get('conversations/' + user._id, { withCredentials: true });
                setConversation(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchConversations();
    }, [user._id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('message/' + selectedConvo._id, { withCredentials: true });
                setMessages(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (selectedConvo !== null) fetchMessages();
    }, [selectedConvo])

    const handleSend = async () => {
        const message = {
            conversationID: selectedConvo._id,
            senderID: user._id,
            message: newMessage
        }

        try {
            const response = await axios.post('message/', message, { withCredentials: true });
            setMessages([...messages, response.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        LastMessage.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return (
        <>
            <Navbar />
            <div className="chat">
                <div className="chatWrapper">
                    <div className="chatMenu">
                        <div className="chatMenuWrapper">
                            <input type="text" placeholder='Search for friends' className='chatMenuSearch' />
                            {
                                conversation.map(conv => (
                                    <Conversation conversation={conv} me={user._id} key={conv._id} setSelectedConvo={setSelectedConvo} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="chatBox">
                        <div className="chatBoxWrapper">
                            {selectedConvo ?
                                <>
                                    <div className="chatBoxTop">
                                        {
                                            messages.map(message => (
                                                <div ref={LastMessage} key={message._id}>
                                                    <Message message={message} own={message.senderID === user._id} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea name="chatBoxMessage" className='chatBoxMessage' placeholder='Type a message' onChange={(e) => { setNewMessage(e.target.value) }} value={newMessage}></textarea>
                                        <button type="submit" className="chatBoxBtn" onClick={handleSend}>Send</button>
                                    </div>
                                </>
                                : <span>Open a Conversation to start chatting</span>
                            }
                        </div>
                    </div>
                    <div className="chatOnline">
                        <div className="chatOnlineWrapper">
                            <div className="chatOnlineFriends">
                                <h2 className="chatOnlineFriendsTitle">Online Friends</h2>
                                <ul className="chatOnlineFriendsList">
                                    <Online />
                                    <Online />
                                    <Online />
                                    <Online />
                                    <Online />
                                    <Online />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}