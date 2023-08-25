import Express from 'express';
import userAuthController from '../controller/userAuthController.js';
import userPropertyController from '../controller/userPropertyController.js';
import paymentController from '../controller/paymentController.js';

const router = Express.Router();

// User authentication routes
router.post('/signup', userAuthController.postSignUp);
router.post('/otp', userAuthController.postOtpVerify);
router.post('/login', userAuthController.postLogIn);
router.post('/logout', userAuthController.userLogout);
router.get('/auth', userAuthController.getLoggedInUser);
router.post('/auth/login/google', userAuthController.googleAuth);
router.patch('/updatePhoneNumber', userAuthController.userPhoneNumber);
router.post('/updateDetails/:userId', userAuthController.updateDetails);
router.post('/updateProfile/:userId', userAuthController.updateProfile);
router.post('/forgotpassword', userAuthController.forgotPassword);
router.post('/verifyotp', userAuthController.verifyOTP);
router.post('/updatepassword', userAuthController.postUpdatePassword);

// User property routes
router.get('/getListings', userPropertyController.getListings);
router.get('/getListingById/:propertyId', userPropertyController.getListingById);
router.get('/getHostById/:hostId', userPropertyController.getHostById);

// Payment routes
router.post('/payment', paymentController.paymentOrder);
router.post('/payment/verify', paymentController.paymentVerify);
router.get('/order-success', paymentController.getOrderSuccess);
router.post('/checkout', paymentController.postCheckout);

// Booking
router.get('/getReservations/:userId', userPropertyController.getReservationsById);
router.get('/booking', userAuthController.getBookingById);
router.get('/getBookingByPropertyId/:propertyId', userPropertyController.getBookingByPropertyId);

// Wishlist
router.post('/addToWishList', userPropertyController.addToWishList);
router.post('/addReview', userPropertyController.addReview);
router.post('/removeFromWishList', userPropertyController.removeFromWishList);
router.get('/getWishlist/:userId', userPropertyController.getWishList);

export default router;
