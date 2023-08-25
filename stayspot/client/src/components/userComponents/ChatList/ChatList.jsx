
import { Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ChatList({ usersList, onlineUsers, lastMessage, setChatClicked, chatClicked }) {
  console.log(onlineUsers,"onlineUsers");
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (usersList) {
      setUsers(usersList)
    }
  }, [usersList])
  const searchUsers = (e) => {
    try {
      let value = e.target.value
      let chats = usersList.filter((item, index) => {
        return item?.hostId?.name?.match(new RegExp(value, 'i'))
      })
      setUsers(chats)
    } catch (err) {
      console.log(err)
    }

  }
  const defaultImg = "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png"
  return (
    <div className={`col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 chat-list ${chatClicked && 'hide-sec'}`}>
      <div className="">
        <div className="input-group srch rounded mb-3">
          <input type="search" onChange={searchUsers} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search" />
          </span>
        </div>
        <div data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: 400 }}>
          <ul className="list-unstyled mb-0">

            {
              users && users[0] &&
              users.map((chat, index) => {
                console.log( onlineUsers[chat?.hostId?._id],"onen");
                return (
                  <li className="p-2 border-bottom" key={index}>
                    <Link to={"/chat?id=" + chat?.hostId?._id} onClick={() => setChatClicked(true)} className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div>
                          <img src={chat?.hostId?.image ? chat?.hostId?.image: defaultImg} alt="avatar" className="d-flex align-self-center me-3 chat-avatar" width={60} />
                          {
                            onlineUsers[chat?.hostId?._id] &&
                            <span className="badge bg-success badge-dot" />
                          }
                        </div>
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{chat?.hostId?.firstName}</p>
                          <p className="small text-muted">
                            {lastMessage[chat._id]}
                          </p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-muted mb-1">
                          {
                            onlineUsers[chat?.hostId?._id] &&
                            <Chip label={"Active now"} color="primary" variant="outlined" />
                          }
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>
    </div>
  )
}