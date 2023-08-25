import axios from '../axios';

// User registration
export const postSignUp = (data) => {
  return axios.post('/signup', data);
};

// Verify user OTP
export const postUserOtp = (otp, formData) => {
  return axios.post('/otp', { otp, ...formData });
};

// User login
export const postLogin = (data) => {
  return axios.post('/login', data);
};
export const postForgotPassword = (data) => {
  console.log(data,"daa");
  return axios.post('/forgotpassword',{data});
};
export const postVerifyOtp= (data) => {
  console.log(data,"daa");
  return axios.post('/verifyotp',{data});
};
export const postUpdatePassword= (data) => {
  console.log(data,"daa");
  return axios.post('/updatepassword',{data});
};


// Login with Google
export const loginWithGoogle = (data) => {
  return axios.post('/auth/login/google', data);
};

// User logout
export const userLogout = () => {
  return axios.post('/logout');
};

// Get property listings
export const getListings = (structure) => {
  // Only send the structure parameter if it's not null
  const params = structure ? { structure } : {};
  return axios.get('/getListings', { params });
};


// Get listing by ID
export const getListingById = (propertyId) => {
  return axios.get(`/getListingById/${propertyId}`);
};

// Get host by ID
export const getHostById = (hostId) => {
  return axios.get(`/getHostById/${hostId}`);
};


// Process payment checkout
export const postCheckout = (details) => {
  return axios.post('/checkOut', details);
};

// Get user's bookings
export const getBookingById = (id) => {
  return axios.get(`/booking?id=${id}`);
};

// Add property to wishlist
export const addToWishList = (propertyId, userId) => {
  return axios.post('/addToWishList', { propertyId, userId });
};

// Remove property from wishlist
export const removeFromWishList = (propertyId, userId) => {
  return axios.post('/removeFromWishList', { propertyId, userId });
};

// Get user's wishlist
export const getWishlist = (userId) => {
  return axios.get(`/getWishlist/${userId}`);
};

// Get matching listings based on coordinates
export const getMatchingListings = (coordinates) => {
  return axios.get('/getMatchingListings', { params: { coordinates } });
};

// Update user details
export const updateDetails = async (userId, details) => {
  console.log(details,"fur");
  return axios.post(`/updateDetails/${userId}`, { details });
};

export const updateProfile = async (userId, details) => {
  console.log(details,"fur");
  return axios.post(`/updateProfile/${userId}`, { details });
};
// Get user's reservations
export const getReservationById = async (userId) => {
  return axios.get(`/getReservations/${userId}`);
};

// Get booking by property ID
export const getBookingByPropertyId = async (propertyId) => {
  return axios.get(`/getBookingByPropertyId/${propertyId}`);
};

export const addReview=async (reviewDetails)=>{
  return axios.post('/addReview',{reviewDetails})
}
export const userChats=async (id)=>{
  return axios.get(`/chat/${id}`)
}
export const getMessages=async(id)=>{
  return axios.get(`/chat/messages/${id}`)
}

