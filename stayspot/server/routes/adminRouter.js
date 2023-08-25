import Express from "express";
import adminControllers from "../controller/adminController.js";

// Create an Express router instance
const router = Express.Router();

// Admin authentication and session endpoints
router.post('/login', adminControllers.postLogIn);
router.post('/logout', adminControllers.adminLogout);
router.get('/auth', adminControllers.getLoggedInAdmin);

// User and host management endpoints
router.post('/blockuser', adminControllers.postBlockUser);
router.post('/unblockuser', adminControllers.postUnBlockUser);
router.post('/blockhost', adminControllers.postBlockHost);
router.post('/unblockhost', adminControllers.postUnBlockHost);
router.get('/users', adminControllers.getUsers);
router.get('/hosts', adminControllers.getHosts);

// Property management endpoints
router.get('/properties', adminControllers.getProperties);
router.post('/property-status-update/:propertyId', adminControllers.postUpdateListingStatus);

// Withdrawal management endpoints
router.get('/getWithdraw', adminControllers.getWithdraw);
router.post('/updatestatus', adminControllers.updateWithdrawStatus);

// Host registration and booking management endpoints
router.post('/addhost', adminControllers.postAddHost);
router.get('/bookings', adminControllers.getBookings);

// Get user and booking details by their IDs
router.get('/getUserById/:userId', adminControllers.getUserById);
router.get('/getBookingById/:bookingId', adminControllers.getBookingById);

export default router;
