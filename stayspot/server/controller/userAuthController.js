import userModel from "../models/UserModel.js";
import sentOTP from "../constant/sentOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import axios from "axios";
import cloudinary from '../constant/config.js';
import bookingModel from "../models/BookingModel.js";
import otpGenerator from 'otp-generator';
// Helper function to create a token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.TOKEN_SECERET_KEY);
};
let storedOtp=null;

export default {
 // User registration endpoint
postSignUp: async (req, res) => {
  try {
    const existingEmail = await userModel.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.json({ err: true, message: 'User already exists' });
    } else if (
      !req.body.firstName.trim() ||
      !req.body.lastName.trim() ||
      !req.body.email.trim() ||
      !req.body.password.trim()
    ) {
      return res.json({ err: true, message: 'Fields cannot be empty' });
    } else if (req.body.password !== req.body.confirmPassword) {
      return res.json({ err: true, message: 'Passwords do not match' });
    } else {
      // Generate and send an OTP for email verification
      let otp = Math.ceil(Math.random() * 10000);
      let otpSent = await sentOTP(req.body.email, otp);

      // Create a token with OTP for email verification
      const signUpToken = jwt.sign(
        {
          otp: otp
        },
        process.env.TOKEN_SECERET_KEY
      );

      // Set the token in a cookie and respond with success message
      res.cookie("signUpToken", signUpToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 10,
        sameSite: "none",
      }).json({ err: false, message: 'OTP sent successfully' });
    }
  } catch (error) {
    res.json({ err: true, message: error.message });
  }
},

// OTP verification endpoint
postOtpVerify: async (req, res) => {
  try {
    let otp = req.body.otp;
    let userToken = req.cookies.signUpToken;

    // Verify the OTP token
    const OtpToken = jwt.verify(
      userToken,
      process.env.TOKEN_SECERET_KEY
    );

    // Hash the user's password
    let bcrypPassword = await bcrypt.hash(req.body.password, 10);

    if (otp == OtpToken.otp) {
      // Create a new user if OTP is verified
      let user = await userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypPassword,
        blocked: false
      });

      // Generate a token for the new user
      const userToken = createToken(user._id);

      // Set the user token in a cookie and respond with success message
      return res.cookie("userToken", userToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      }).json({ err: false, message: 'User registration success' });
    } else {
      // Respond with error message if OTP is incorrect
      res.json({ err: true, message: 'Check otp' });
    }
  } catch (error) {
    res.json({ err: true, message: error.message });
  }
},

// Get logged-in user details endpoint
getLoggedInUser: async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.json({ loggedIn: false, error: true, message: "No token" });
    }

    // Verify the user's token and retrieve user details
    const verifiedJWT = jwt.verify(token, process.env.TOKEN_SECERET_KEY);
    const user = await userModel.findById(verifiedJWT.id, { password: 0 });

    if (!user) {
      return res.json({ loggedIn: false, error: true, message: "User not found" });
    }
    if (user.blocked) {
      return res.json({ loggedIn: false, error: true, message: "User is blocked" });
    }

    // Respond with user details and token
    return res.json({ loggedIn: true, user, token });
  } catch (err) {
    res.json({ loggedIn: false, error: true, message: err.message });
  }
},

// User login endpoint
postLogIn: async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (existingUser.blocked === true) {
        return res.json({ err: true, message: 'Sorry, you are banned' });
      } else if (bcrypt.compareSync(password, existingUser.password)) {
        // Generate a token for the authenticated user
        const token = createToken(existingUser._id);

        // Set the user token in a cookie and respond with success message
        return res.cookie("userToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
        }).json({ err: false, message: 'User login success' });
      } else {
        return res.json({ err: true, message: 'Incorrect password' });
      }
    } else {
      return res.json({ err: true, message: 'Email does not exist' });
    }
  } catch (error) {
    res.json({ err: true, message: error.message });
  }
},
// Google authentication endpoint
googleAuth: async (req, res) => {
  try {
    if (req.body.access_token) {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`);
      const user = await userModel.findOne({ googleId: response.data.id, loginWithGoogle: true }, { password: 0 });
      if (user) {
        if (!user.blocked) {
          const token = createToken(user._id);
          return res.cookie("userToken", token, {
            httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7, sameSite: "none",
          }).json({ created: true, user, token, message: "Login Success" });
        } else {
          return res.status(200).json({ user, message: "Sorry, you are banned!" });
        }
      } else {
        let bcrypPassword = await bcrypt.hash(response.data.id, 10);
        const newUser = await userModel.create({
          googleId: response.data.id,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          email: response.data.email,
          image: response.data.picture,
          loginWithGoogle: true,
          password: bcrypPassword,
        });
        const token = createToken(newUser._id);
        return res.cookie("userToken", token, {
          httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7, sameSite: "none",
        }).json({ created: true, user: newUser, token, message: "Signup Success" });
      }
    } else {
      return res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ created: false, message: "Internal server error" });
  }
},

// User logout endpoint
userLogout: async (req, res) => {
  return res.cookie("userToken", '', {
    httpOnly: true, secure: true, maxAge: 0, sameSite: "none",
  }).json({ err: false, message: 'Logged out successfully' });
},

// Update user phone number endpoint
userPhoneNumber: async (req, res) => {
  try {
    const { phoneNumber, _id } = req.body;
    await userModel.findByIdAndUpdate(_id, { phoneNumber });
    res.status(200).json({ message: 'Phone number updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the phone number.' });
  }
},

// Get booking details by ID endpoint
getBookingById: async (req, res) => {
  try {
    const { id } = req.query;
    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ booking, message: 'Booking details' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting booking details' });
  }
},
// Update user details endpoint
updateDetails: async (req, res) => {
  try {
    const { userId } = req.params;
    const { details } = req.body;
    const updatedUser = await userModel.updateOne(
      { _id: userId },
      { $set: details },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({ message: 'User details updated successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

// Update user profile image endpoint
updateProfile: async (req, res) => {
  try {
    const { userId } = req.params;
    const { details } = req.body;
    const result = await cloudinary.uploader.upload(details, {
      folder: 'profileImage'
    });
    const updatedUser = await userModel.updateOne(
      { _id: userId },
      { $set: { image: result.secure_url } }
    );
    return res.status(200).json({ message: 'User profile image updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

// Forgot password endpoint
forgotPassword: async (req, res) => {
  try {
    const email = req.body.data;
    const result = await userModel.findOne({ email });
    // Generate and send OTP
    await sentOTP(email, numericOtpNumber);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
},

// Verify OTP endpoint
verifyOTP: async (req, res) => {
  try {
    const receivedOtp = req.body.data;
    if (receivedOtp === storedOtp) {
      storedOtp = null;
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
},

// Update password endpoint
postUpdatePassword: async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (response) {
      return res.status(200).json({
        success: true,
        message: 'Password updated successfully.'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'User not found or password not updated.'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the password.'
    });
  }
}

};    
