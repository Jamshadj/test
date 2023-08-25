import jwt from "jsonwebtoken";
import adminModel from "../models/AdminModel.js";
import userModel from "../models/UserModel.js";
import hostModel from "../models/HostModel.js";
import propertyModel from "../models/PropertyModel.js";
import bookingModel from "../models/BookingModel.js";
import WithdrawModel from "../models/WithdrawModel.js";

export default {
    // Admin login
    postLogIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await adminModel.findOne({ email });

            if (!admin) {
                return res.json({ err: true, message: 'Email does not exist' });
            }

            if (password !== admin.password) {
                return res.json({ err: true, message: 'Incorrect password' });
            }

            const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECERET_KEY);

            res.cookie('adminToken', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: 'none'
            }).json({ err: false, message: 'Admin login success' });
        } catch (error) {
            console.log(error);
            res.json({ err: true, message: error.message });
        }
    },

    // Get admin status
    getLoggedInAdmin: async (req, res) => {
        try {
            const token = req.cookies.adminToken;
            if (!token) {
                return res.json({ loggedIn: false, error: true, message: 'No token' });
            }

            const verifiedJWT = jwt.verify(token, process.env.TOKEN_SECERET_KEY);
            const admin = await adminModel.findById(verifiedJWT.id, { password: 0 });

            if (!admin) {
                return res.json({ loggedIn: false, error: true, message: 'User not found' });
            }

            return res.json({ loggedIn: true, admin, token });
        } catch (err) {
            console.log(err);
            res.json({ loggedIn: false, error: true, message: err.message });
        }
    },

    // Get users
    getUsers: async (req, res) => {
        try {
            const users = await userModel.find().lean();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userModel.findById(userId); // Find user by ID
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Block user
    postBlockUser: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.blocked = true; // Set user as blocked
            await user.save(); // Save updated user data
            res.json({ message: "User blocked" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Unblock user
    postUnBlockUser: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.blocked = false; // Set user as unblocked
            await user.save(); // Save updated user data
            res.json({ message: "User unblocked" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Get hosts
    getHosts: async (req, res) => {
        try {
            const hosts = await hostModel.find().lean();
            res.json(hosts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },


    // Block a host
    postBlockHost: async (req, res) => {
        try {
            console.log("block host");
            const { hostId } = req.body;

            const host = await hostModel.findById(hostId);

            if (!host) {
                return res.status(404).json({ error: "Host not found" });
            }

            host.blocked = true; // Set host as blocked
            await host.save(); // Save updated host data
            return res.json({ message: "Host blocked successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Unblock a host
    postUnBlockHost: async (req, res) => {
        try {
            const { hostId } = req.body;
            console.log("Unblock host", hostId);
            const host = await hostModel.findById(hostId);

            if (!host) {
                return res.status(404).json({ error: "Host not found" });
            }

            host.blocked = false; // Set host as unblocked
            await host.save(); // Save updated host data
            return res.json({ message: "Host unblocked successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get withdrawal requests
    getWithdraw: async (req, res) => {
        try {
            const withdraw = await WithdrawModel.find().lean();
            res.json(withdraw);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Update withdrawal status and adjust host's wallet balance
    updateWithdrawStatus: async (req, res) => {
        try {
            const { _id, hostId, amount } = req.body.data; // Destructure the properties

            // Update withdrawal status
            const response = await WithdrawModel.findByIdAndUpdate(_id, {
                status: true
            });

            // Update host's wallet balance
            await hostModel.findByIdAndUpdate(hostId, { $inc: { wallet: -amount } });

            res.json(response); // Respond with updated status
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all bookings
    getBookings: async (req, res) => {
        try {
            const bookings = await bookingModel.find().lean();
            res.json(bookings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get a specific booking by ID
    getBookingById: async (req, res) => {
        try {
            const { bookingId } = req.params; // Get bookingId from URL
            const booking = await bookingModel.findById(bookingId);
            res.json(booking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },



    // Admin logout
    adminLogout: async (req, res) => {
        console.log("admin logout");
        return res.cookie("adminToken", '', {
            httpOnly: true,
            secure: true,
            maxAge: 0, // Set the maxAge to 0 to expire the cookie immediately
            sameSite: "none",
        }).json({ err: false, message: 'Logged out successfully' });
    },

    // Get properties
    getProperties: async (req, res) => {
        try {
            console.log("propr");
            const properties = await propertyModel.find().lean();
            res.json(properties);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    },
    // Update listing status
    postUpdateListingStatus: async (req, res) => {
        try {
            const { propertyId } = req.params;
            const status = req.body.status; // Get the status from the request body directly

            const property = await propertyModel.updateOne({ _id: propertyId }, { status: status });
            res.json({ message: 'Listing status updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update listing status' });
        }
    },

    // Add a new host
    postAddHost: async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, password } = req.body;

            // Create a new host using the hostModel
            const newHost = new hostModel({
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            });

            // Save the new host to the database
            const savedHost = await newHost.save();

            res.status(201).json({
                message: 'Host created successfully',
                host: savedHost
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred while creating the host'
            });
        }
    }

};