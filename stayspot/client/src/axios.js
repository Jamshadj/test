import axios from "axios";
import {BASE_URL} from './constant/constant'

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
  });

  export default instance; 