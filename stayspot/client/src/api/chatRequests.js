import axios from "../axios";

export const createChat = (data) => {
    console.log(data,'daaaaa'); // Logging the data object
    return axios.post('/chat/', data); // Making the POST request using axios
  };

export const getUserChats = (id) => axios.get(`/chat/${id}`);

export const findChat = (userId, hostId) => axios.get(`/chat/find/${userId}/${hostId}`);