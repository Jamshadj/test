import React, { useEffect, useState } from 'react';
import { getHostById } from '../../../api/userApi';
import '../UserChats/UserChat.css'; 

function Conversation({ data, currentUserId }) {
  const [hostData, setHostData] = useState(null);

  useEffect(() => {
    const hostId = data.members.find((id) => id !== currentUserId);

    const getHostData = async () => {
      try {
        const response = await getHostById(hostId);
        setHostData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getHostData();
  }, [data.members, currentUserId]); // Add data.members and currentUserId to the dependency array

  return (
    <>
    <div className='follower conversation'>
      {hostData && (
        <div>
        <div className='online-dot'>   </div>
          <img src={hostData.image} alt="" style={{width:"50px",height:"50px"}} />
           <div className='name'style={{fontSize:"0.8rem"}} >
            <span>{hostData.firstName}</span> 
            <span>Online</span>
           </div>
        </div>
      )}
    </div>
    <hr />
    </>
  );
}

export default Conversation;
