import axios from "../axios";

export async function postSignUp(data) {
      return axios.post('/host/signup', data);
}
export async function postHostOtp(otp, formData) {
    return axios.post('/host/otp', { otp, ...formData });
  }
  export async function postLogin(data) {
    return axios.post('/host/login',  data);
  }
  export const loginWithGoogle = (data) => {
    return axios.post('/host/auth/login/google', data);
  };
  export const postHostLogout = () => {
    return axios.post('/host/logout');
  };
  export const postAddProperty = (data) => {
    console.log("data",data);
    return axios.post('/host/add-property',{...data});
  };
  export const setDates = (data) => {
    console.log("deeded");
    return axios.post('/host/set-date', data);
  };
  export const updateDetails = async (hostId,details) => {
    console.log(details,hostId, "hodt");
    return axios.post(`/host/updateDetails/${hostId}`, { details }); // Assuming you have the user's id available
  };

  export async function getBookingByHostId(Id) {
    return await axios.get(`/host/getBookingById/${Id}`);
  }
  export async function getWithdrawById(hostId) {
    return await axios.get(`/host/withdraw/${hostId}`)
  }
  
  // export async function getBookingsById(hostId) {
  //   return await axios.get(`/host/getbookings/${hostId}`)
  // }

  export async function updateBookingStatus(bookingId, status,hostId) {
    return await axios.post(`/host/updatestatus/${bookingId}`, { status ,hostId});
  }

  export async function withdrawRequest(withdrawalRequest) {
    return await axios.post('/host/withdraw' ,{ withdrawalRequest});
  }
  
  