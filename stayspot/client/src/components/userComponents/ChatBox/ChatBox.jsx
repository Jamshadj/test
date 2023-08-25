import React, { useEffect, useState } from 'react';
import '../UserChats/UserChat.css';
import { getHostById, getMessages } from '../../../api/userApi';
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji"
function ChatBox({ chat, currentUserId }) {
  const [hostData, setHostData] = useState(null);
  const [messages,setMessage]=useState([])
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    if (chat) { // Check if chat is not null before proceeding
      const hostId = chat.members.find((id) => id !== currentUserId);
      const getHostData = async () => {
        try {
          const response = await getHostById(hostId);
          setHostData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      getHostData();
    }
  }, [chat, currentUserId]);
useEffect(()=>{
  const fetchMessages=async ()=>{
    try {
      const {data}=await getMessages(chat._id)
      console.log(data,"chatdata ");
      setMessage(data)
    } catch (error) {
      
    }
  }
  fetchMessages()
},[chat])
const handleChange = (text) => {
  setNewMessage(text);
};

  return (
    <>
      <div className='ChatBox-container'>
        {chat? (  <>
          <div className='chat-header'>
            <div className='follower'>
              {hostData && (
                <div>

                  <img src={hostData.image} alt="" style={{ width: "50px", height: "50px" }} />
                  <div className='name' style={{ fontSize: "0.8rem" }} >
                    <span>{hostData.firstName}</span>

                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className='chat-body'>
               {messages.map((message)=>(
                <>
                <div className={message.senderId===currentUserId ? "message own":"message"}>
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
                <div className='chat-sender'>
                    <div>+</div>
                    <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                    />
                    <div className='send-button button'>send</div>
                </div>
                </>
               ))}
          </div>
        </>):(
          <span className='chatbox-empty-message'>
            Tap on chat conversation
          </span>
        )}
      
      </div>
    </>
  );
}

export default ChatBox;
