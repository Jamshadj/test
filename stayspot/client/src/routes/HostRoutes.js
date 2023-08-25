import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios.js";
import HostSignup from "../pages/HostPages/HostSignup";
import HostHome from "../pages/HostPages/HostHome";
import HostLogin from "../pages/HostPages/HostLogin";
import AboutProperty from "../pages/HostPages/AboutProperty.jsx";
import SelectStructure from "../pages/HostPages/SelectStructure.jsx";
import PrivacyType from "../pages/HostPages/PrivacyType.jsx";
import AddLocation from "../pages/HostPages/AddLocation.jsx";
import SetFloorplan from "../pages/HostPages/SetFloorplan.jsx";

import Step2page from "../pages/HostPages/Step2page.jsx";
import AddImagesPlace from "../pages/HostPages/AddImagesPlace.jsx";
import AddTitlePage from "../pages/HostPages/AddTitlePage.jsx";
import AddDescriptonPage from "../pages/HostPages/AddDescriptonPage.jsx";
import Step3Page from "../pages/HostPages/Step3Page.jsx";
import SetPricePage from "../pages/HostPages/SetPricePage.jsx";
import SetAvaliableDatesPage from "../pages/HostPages/SetAvaliableDatesPage.jsx";
import SetInstantBooking from "../pages/HostPages/SetInstantBooking.jsx";
import PropertyListingPage from "../pages/HostPages/PropertyListingPage.jsx";
import ManagePlacePage from "../pages/HostPages/ManagePlacePage.jsx";
import SetAvalibality from "../pages/HostPages/SetAvalibality.jsx";
import PropertyDetailsPage from "../pages/HostPages/PropertyDetailsPage.jsx";
import SelectAmenities from "../pages/HostPages/SelectAmenities.jsx";
import HostProfile from "../components/hostComponents/HostProfile/HostProfile.jsx";
import ReservationDetails from "../components/hostComponents/Reversations/ReservationDetails.jsx";
import ReservationHistory from "../components/hostComponents/Reversations/ReservationHistory.jsx";
import PaymentHistoryPage from "../pages/HostPages/PaymentHistoryPage";
import HostChat from "../components/hostComponents/HostChat/HostChat.jsx";

 
export default function HostRoutes() {
  const { host, refresh } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/host/auth')
      .then((response) => {
        console.log("HOST:", response.data);
        dispatch({ type: 'host', payload: { login: response.data.loggedIn, details: response.data.host } });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh, dispatch]);

  return (
    <Routes>
      {host.login ? (
        <>
          <Route path="/signup" element={<Navigate to="/host" replace />} />
          <Route path="/paymenthistory" element={<PaymentHistoryPage/>} />
          <Route path="/otp" element={<Navigate to="/host" replace />} />
          <Route path="/login" element={<Navigate to="/host" replace />} />
          <Route path="/about-your-place" element={<AboutProperty/>}/>
          <Route path="/structure" element={<SelectStructure/>}/>
          <Route path="/privacy-type" element={<PrivacyType/>}/>
          <Route path="/location" element={<AddLocation/>}/>
          <Route path="/floor-plan" element={<SetFloorplan/>}/>
          <Route path="/step-2" element={<Step2page/>}/>
          <Route path="/amenities" element={<SelectAmenities/>}/>
          <Route path="/add-images" element={<AddImagesPlace/>}/>
          <Route path="/add-title" element={<AddTitlePage/>}/>
          <Route path="/add-description" element={<AddDescriptonPage/>}/>
          <Route path="/step-3" element={<Step3Page/>}/>
          <Route path="/set-avaliblity" element={<SetAvalibality/>}/>
          <Route path="/setPrice" element={<SetPricePage/>}/>
          <Route path="/reservations/:hostId" element={<ReservationHistory/>}/>
          <Route path="/reservationDetails/:bookingId" element={<ReservationDetails/>}/>
          <Route path="/property-details-page" element={<PropertyDetailsPage/>}/>
          {/* <Route path="/set-avaliblity" element={<SetAvaliableDatesPage/>}/> */}
          <Route path="/listings" element={<PropertyListingPage/>}/>
          <Route path="/instant" element={<SetInstantBooking/>}/>
          <Route path="/manage-your-place/:propertyId/details" element={<ManagePlacePage />} />
          <Route path="/profile/:hostId" element={<HostProfile/>} />
          <Route path="/" element={<HostHome />} />
          <Route path="/chat" element={<HostChat />} />
        </>
      ) : (
        <>
          <Route path="/signup" element={<HostSignup />} />
          <Route path="/" element={<Navigate to="/host/login"/>}/>
          <Route path="/login" element={<HostLogin />} />
        </>
      )}
    </Routes>
  );
}
