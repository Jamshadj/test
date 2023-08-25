import Express from "express";
import hostAuth from "../controller/hostAuthControllers.js";
import hostPropertyControllers from "../controller/hostPropertyControllers.js";

const router = Express.Router();
// Authentication Routes
router.post('/signup', hostAuth.postSignUp);
router.post('/otp', hostAuth.postOtpVerify);
router.post('/login', hostAuth.postLogIn);
router.post('/logout', hostAuth.hostLogout);
router.get('/auth', hostAuth.getLoggedInHost);
router.post("/auth/login/google", hostAuth.googleAuth);

// Property Routes
router.post('/add-property', hostPropertyControllers.postAddProperty);
router.post('/set-date', hostPropertyControllers.setDates);
router.get('/properties/:hostId', hostPropertyControllers.getProperties);
router.get('/property/:propertyId', hostPropertyControllers.getProperty);
router.post('/edit-data', hostPropertyControllers.postPropertyEditBasics);
router.post('/update-property-field', hostPropertyControllers.postPropertyEditProperty);
router.post('/update-price', hostPropertyControllers.postPropertyEditPrice);

// Booking Routes
router.get('/getBookingById/:hostId', hostPropertyControllers.getBookingByHostId);
router.post('/updatestatus/:bookingId', hostPropertyControllers.updateBookingStatus);

// Withdraw Routes
router.post('/withdraw', hostPropertyControllers.withdrawRequest);
router.get('/withdraw/:hostId', hostPropertyControllers.getWithdrawById);


export default router;
