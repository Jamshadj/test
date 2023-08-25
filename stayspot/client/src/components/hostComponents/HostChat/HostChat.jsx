import React, { useEffect, useRef, useState } from 'react'
import '../../userComponents/Chat/chat.css';
import './mdb.min.css';
import {  useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HostChatList from '../HostChatList/HostChatList';
import HostMessageList from '../HostMessageList/HostMessageList';
import { findHostChat, getHostChats } from '../../../api/hostChatRequests';

import { io } from "socket.io-client";

const socket = io.connect('http://localhost:4000'); // Make sure to add 'http://' to the socket URL.



export default function DoctorChat({ }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [usersList, setUsersList] = useState([])
  const [lastMessage, setLastMessage]= useState({})
  const [chatClicked, setChatClicked]= useState(false)
  const [sendMessage, setSendMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [refresh, setRefresh]= useState(true)
  const [receivedMessage, setReceivedMessage] = useState({});
  const id = searchParams.get('id')
  // const socket = useRef();

  const host = useSelector((state) => state.host.details)
  console.log(host,"host");
  useEffect(() => {
    (async function () {
      try {
        if(id){
          setChatClicked(true)
        }else{
          setChatClicked(false)
        }
        if (id && host) {
          let { data } = await findHostChat(id, host._id)
          if (!data.err) {
            console.log("daaa",data);
            setCurrentChat(data.chat)
          }
        }
        if (host) {
          let { data: users } = await getHostChats(host._id)
          if (!users.err) {
            console.log(users,"user");
            setUsersList(users.chat)
            setLastMessage(users.lastMessage)
          }
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [host, id, refresh])

  useEffect(() => {
    if(host){
      socket.emit("new-user-add", host._id);
      socket.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [host]);

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
      setRefresh(!refresh)
    }
    );
  }, [socket, refresh]);

  return (
    <div className=''>
 
      <section className="chat-main">
        <div className="d-flex">
          <div className="w-100" style={{ boxShadow: "none" }}>
            <div className="card" id="chat3">
              <div className="card-body">
                <div className="row">
                  
                <HostChatList
                onlineUsers={onlineUsers}
                    usersList={usersList}
                    chatClicked={chatClicked}
                    lastMessage={lastMessage}
                    setChatClicked={setChatClicked}
                  />
                  {
                    currentChat ?
                    <HostMessageList
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                    currentChat={currentChat}
                    chatClicked={chatClicked}
                    setChatClicked={setChatClicked}
                  />
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