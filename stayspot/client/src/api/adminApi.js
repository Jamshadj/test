import axios from "../axios"

export async function postLogin(data) {
    return axios.post('/admin/login', data);
}

export async function postAddHost(data) {
    console.log("jjdfj");
    return axios.post('/admin/addhost', data);
}
export async function getUsers() {
    return await axios.get('/admin/users');
}
export async function getHosts() {
    return await axios.get('/admin/hosts');
}
export async function postBlockUser(Id) {
    return await axios.post('/admin/blockuser', { userId: Id });
}
export async function postUnBlockUser(Id) {
    return await axios.post('/admin/unblockuser', { userId: Id });
}
export async function postBlockHost(Id) {
    return await axios.post('/admin/blockhost', { hostId: Id });
}
export async function postUnBlockHost(Id) {
    return await axios.post('/admin/unblockhost', { hostId: Id });
}
export async function postAdminLogout() {
    return await axios.post('/admin/logout')
}
export async function updateWithdrawStatus(data) {
    return await axios.post('/admin/updatestatus',{data})
}
export async function getProperties() {
    return await axios.get('/admin/properties')
}
export async function updateListingStatus(propertyId, status) {
    console.log("propertyId", propertyId, "status", status);
    return await axios.post(`/admin/property-status-update/${propertyId}`, { status });

}
export async function getBookings() {
    return await axios.get('/admin/bookings')
}
export async function getWithdraw() {
    return await axios.get('/admin/getWithdraw')
}
export async function getUserById(Id) {

    return await axios.get(`/admin/getUserById/${Id}`);
  }

  export async function getBookingById(Id) {
    console.log(Id,"iddd");
    return await axios.get(`/admin/getBookingById/${Id}`);
  }
  
  
