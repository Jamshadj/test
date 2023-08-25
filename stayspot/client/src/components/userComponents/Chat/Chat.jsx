import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import './mdb.min.css'
 
import ChatList from '../ChatList/ChatList'
import MessageList from '../MessageList/MessageList'
import { useParams, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { io } from "socket.io-client";

import { createChat, findChat, getUserChats } from '../../../api/chatRequests'
const socket = io.connect('http://localhost:4000');


export default function Chat({ }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [usersList, setUsersList] = useState([])
  const [lastMessage, setLastMessage]= useState({})
  const [chatClicked, setChatClicked]= useState(false)
  const [onlineUsers, setOnlineUsers] = useState({});
  const [refresh, setRefresh]= useState(true)

  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState({});
  const id = searchParams.get('id')
  // const socket = useRef();
  const user = useSelector((state) => state.user.details)
 
  useEffect(() => {
    (async function () {
      try {
        if(id){
          setChatClicked(true)
        }else{
          setChatClicked(false)
        }
        if (id && user) {
          let { data } = await findChat(user._id, id)
          if (!data.err) {
            setCurrentChat(data.chat)
          }
        }
        if (user) {
          let { data: users } = await getUserChats(user._id)
          console.log(users,"datachats");
          if (!users.err) {
            setUsersList(users.chat)
            console.log(usersList);
            setLastMessage(users.lastMessage)
          }
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [user, id])
  useEffect(() => {
    if(user){
      socket.emit("new-user-add", user._id);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [user]);
  useEffect(() => {
    if (sendMessage!==null) {
      socket.emit("send-message", sendMessage);}
  }, [sendMessage]);


  useEffect(() => {
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    socket.on("recieve-message", (data) => {
      setReceivedMessage(data);
    }
    );
  }, [socket]);

  return (
    <div className='container'>
      <section className="chat-main containers">
        <div className>
          <div className="col-md-12" style={{ boxShadow: "none" }}>
            <div className="card" id="chat3">
              <div className="card-body">
                <div className="row">
                  
                  <ChatList onlineUsers={onlineUsers} usersList={usersList} chatClicked={chatClicked} lastMessage={lastMessage} setChatClicked={setChatClicked}></ChatList>
                  {
                    currentChat ?
                      <MessageList setSendMessage={setSendMessage} receivedMessage={receivedMessage} currentChat={currentChat} chatClicked={chatClicked} setChatClicked={setChatClicked} ></MessageList>
                      :
                      <div className="col-md-6 col-lg-7 col-xl-8">
                      <div className="tap-on-chat-main">
                        <div className="tap-container">
                          <h4>
                            Tap on a chat to start conversation...
                          </h4>
                        </div>
                      </div>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}