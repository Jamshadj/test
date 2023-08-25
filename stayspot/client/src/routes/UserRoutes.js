import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../components/userComponents/SignUp/SignUp.";
import OTPModal from "../components/userComponents/Otp/Otp";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";

import UserSignup from "../pages/userPages/UserSignup";
import UserLogin from "../pages/userPages/UserLogin";
import UserHome from "../pages/userPages/UserHome";
import UserProfilePage from "../pages/userPages/UserProfilePage";
import UserIndiviualProperty from "../pages/userPages/UserIndiviualProperty";
import PropertyReserve from "../pages/userPages/PropertyReserve";
import BookingSucessPage from "../pages/userPages/BookingSucessPage";
import FavoritesPage from "../pages/userPages/FavoritesPage";
import MatchingListingPages from "../pages/userPages/MatchingListingPages";
import ReservationHistory from "../pages/userPages/ReservationHistory";
import ReservationDetailsPage from "../pages/userPages/ReservationDetailsPage";
import PaymentHistoryPage from "../pages/HostPages/PaymentHistoryPage";
import Chat from "../components/userComponents/Chat/Chat";



export default function UserRoutes() {
  const { user, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/auth')
      .then((response) => {
        console.log("USER:", response.data);
        dispatch({ type: 'user', payload: { login: response.data.loggedIn, details: response.data.user } });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh, dispatch]);

  return (
    <Routes>
     {user.login ? (
        <>
          <Route path="/signup" element={<Navigate to="/" replace />} />
          <Route path="/otp" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/reserve" element={<PropertyReserve/>} />
          <Route path="/order-success" element={<BookingSucessPage/>} />
          <Route path="/favorites" element={<FavoritesPage/>} />
          <Route path="/rooms/:propertyId" element={<UserIndiviualProperty />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          <Route path="/" element={<UserHome />} />
          <Route path="/" element={<UserHome />} />
          <Route path="/matchingListing" element={<MatchingListingPages/>} />
          <Route path="/reservationHistory" element={<ReservationHistory/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/reservationDetails/:bookingId" element={<ReservationDetailsPage/>} />
         
        </>
      ) : (
        <>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/otp" element={<OTPModal />} />

          <Route path="/" element={<UserHome />} />
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        </>
      )}
    </Routes>
  );
}
 