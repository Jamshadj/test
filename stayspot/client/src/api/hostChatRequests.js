import axios from "../axios";

export const createHostChat = (data) => axios.post('/host/chat', data);

export const getHostChats = (id) => axios.get(`/host/chat/${id}`);

export const findHostChat = (userId, hostId) => axios.get(`/host/chat/find/${userId}/${hostId}`);