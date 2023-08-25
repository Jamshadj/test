
import sentOTP from "../constant/sentOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import hostModel from "../models/HostModel.js";
import axios from "axios";
import otpGenerator from 'otp-generator';

// Helper function to create a token
const createToken = (hostId) => {
  return jwt.sign({ id: hostId }, process.env.TOKEN_SECERET_KEY);
};

export default {
  // User sign-up endpoint
  postSignUp: async (req, res) => {
    try {
      const existingEmail = await hostModel.findOne({ email: req.body.email });

      if (existingEmail) {
        res.json({ err: true, message: 'Host already exists' });
      } else if (
        !req.body.firstName.trim() ||
        !req.body.lastName.trim() ||
        !req.body.email.trim() ||
        !req.body.phoneNumber.trim() ||
        !req.body.password.trim()
      ) {
        res.json({ err: true, message: 'Fields cannot be empty' });
      } else if (req.body.password !== req.body.confirmPassword) {
        res.json({ err: true, message: 'Passwords do not match' });
      } else {
        const otp = otpGenerator.generate(4, { digits: true, alphabets: false, specialChars: false });
        const otpSent = await sentOTP(req.body.email, otp);

        const signUpToken = jwt.sign(
          {
            otp: otp
          },
          process.env.TOKEN_SECERET_KEY
        );

        res.cookie("signUpToken", signUpToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 10,
          sameSite: "none",
        }).json({ err: false, message: 'OTP sent successfully' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: true, message: error.message });
    }
  },

  // OTP verification endpoint
  postOtpVerify: async (req, res) => {
    try {
      const otp = req.body.otp;
      const hostToken = req.cookies.signUpToken;
      const OtpToken = jwt.verify(
        hostToken,
        process.env.TOKEN_SECERET_KEY
      );

      const bcrypPassword = await bcrypt.hash(req.body.password, 10);

      if (otp == OtpToken.otp) {
        const host = await hostModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: bcrypPassword,
          blocked: false
        });

        const hostToken = createToken(host._id);
        return res.cookie("hostToken", hostToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
        }).json({ err: false, message: 'Host registration success' });
      } else {
        res.json({ err: true, message: 'Check OTP' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: true, message: error.message });
    }
  },


  // Host login endpoint
  postLogIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingHost = await hostModel.findOne({ email: email });

      if (existingHost) {
        if (existingHost.blocked === true) {
          return res.json({ err: true, message: 'Sorry, you are banned' });
        } else if (bcrypt.compareSync(password, existingHost.password)) {
          const token = createToken(existingHost._id);
          return res.cookie("hostToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ err: false, message: 'Host login success' });
        } else {
          return res.json({ err: true, message: 'Incorrect password' });
        }
      } else {
        return res.json({ err: true, message: 'Email does not exist' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: true, message: error.message });
    }
  },

  // Get logged-in host details
  getLoggedInHost: async (req, res) => {
    try {
      const token = req.cookies.hostToken;
      if (!token) {
        return res.json({ loggedIn: false, error: true, message: "No token" });
      }

      const verifiedJWT = jwt.verify(token, process.env.TOKEN_SECERET_KEY);
      const host = await hostModel.findById(verifiedJWT.id, { password: 0 });

      if (!host) {
        return res.json({ loggedIn: false, error: true, message: "Host not found" });
      }
      if (host.blocked) {
        return res.json({ loggedIn: false, error: true, message: "Host is blocked" });
      }

      return res.json({ loggedIn: true, host, token });
    } catch (err) {
      console.log(err);
      res.json({ loggedIn: false, error: true, message: err.message });
    }
  },

// Google authentication for hosts
  googleAuth: async (req, res) => {
    try {
      if (req.body.access_token) {
        // Get user info from Google
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`);

        // Check if the host exists with the Google ID
        const host = await hostModel.findOne({ googleId: response.data.id, loginWithGoogle: true }, { password: 0 });

        if (host) {
          if (!host.blocked) {
            // Generate a token for the host
            const token = createToken(host._id);
            return res.cookie("hostToken", token, {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              sameSite: "none",
            }).json({ created: true, host, token, message: "Login Success" });
          } else {
            return res.status(200).json({ host, message: "Sorry, you are banned!" });
          }
        } else {
          // Create a new host account with Google info
          const bcrypPassword = await bcrypt.hash(response.data.id, 10);
          const newHost = await hostModel.create({
            googleId: response.data.id,
            firstName: response.data.given_name,
            lastName: response.data.family_name,
            email: response.data.email,
            image: response.data.picture,
            loginWithGoogle: true,
            password: bcrypPassword,
          });

          // Generate a token for the new host
          const token = createToken(newHost._id);
          return res.cookie("hostToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ created: true, host: newHost, token, message: "Signup Success" });
        }
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ created: false, message: "Internal server error" });
    }
  },

  // Host logout
  hostLogout: async (req, res) => {
    return res.cookie("hostToken", '', {
      httpOnly: true,
      secure: true,
      maxAge: 0, // Set the maxAge to 0 to expire the cookie immediately
      sameSite: "none",
    }).json({ err: false, message: 'Logged out successfully' });
  },


  // Update host details
  updateDetails: async (req, res) => {
    try {
      const { hostId } = req.params; // Get hostId from URL
      const { details } = req.body; // Get details from request body
      // Update host details in the database
      const updatedHost = await hostModel.updateOne(
        { _id: hostId },
        { $set: details },
        { new: true }
      );
      if (updatedHost.nModified > 0) {
        // Check if any documents were modified
        return res.status(200).json({ message: 'Host details updated successfully' });
      } else {
        return res.status(404).json({ message: 'Host not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
