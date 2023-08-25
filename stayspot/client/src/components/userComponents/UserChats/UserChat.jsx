// import React, { useEffect, useState } from 'react';
// import './UserChat.css';
// import LogoSearch from './LogoSearch';
// import { userChats } from '../../../api/userApi';
// import { useSelector } from 'react-redux';
// import Conversation from '../Conversation/Conversation';
// import ChatBox from '../ChatBox/ChatBox';

// function UserChat() {
//   const { user } = useSelector((state) => state);
//   const [chats, setChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);

//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const { data } = await userChats(user.details._id);
//         setChats(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [user]);

//   return (
//     <div className='Chat'>
//       <div className='Left-side-chat'>
//         <LogoSearch />
//         <h2>Chats</h2>
//         <div className='Chat-list'>
//           {chats.map((chat) => (
//             <div
//               key={chat._id} // Add a unique key for each mapped element
//               onClick={() => setCurrentChat(chat)}
//             >
//               <Conversation data={chat} currentUserId={user.details._id} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className='Right-side-chat'>
//         <div className='w-80 '>
//           <ChatBox chat={currentChat} currentUserId={user.details._id} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserChat;
