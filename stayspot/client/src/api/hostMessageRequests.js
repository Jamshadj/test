import axios from "../axios";

export const getHostMessages = (id) => axios.get(`/host/message/${id}`);

export const addHostMessage = (data) => axios.post('/host/message/', data);