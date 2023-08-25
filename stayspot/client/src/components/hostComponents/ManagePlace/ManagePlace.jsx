import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import HostNavbar from '../HostNavBar/HostNavbar';

import axios from '../../../axios';
import ListingImages from './ListingImages/ListingImages';
import ListingBasics from './ListingBasics/ListingBasics';
import Location from './Location/Location';
import RoomManage from './RoomManage/RoomManage';
import PricePerNight from './PricePerNight/PricePerNight';

function ManagePlace() {
  // Get the propertyId from the URL params
  const { propertyId } = useParams();

  // Local state to manage the loading status
  const [loading, setLoading] = useState(true);

  // Access the Redux store using useDispatch hook
  const dispatch = useDispatch();

  // Fetch property details when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch property details from the API
        const response = await axios.get(`/host/property/${propertyId}`);
        const propertyDetails = response.data.propertyDetails;
        console.log("pr", propertyDetails);
        // Dispatch an action to set property details in Redux store
        dispatch({ type: 'propertyDetails', payload: propertyDetails });

        // Set loading to false after successfully fetching data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Call the fetchPropertyDetails function
    fetchProperties();
  }, [propertyId, dispatch]);

  // If loading is true, display a loading message (optional: you can add a loading spinner)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      
        <HostNavbar />
      </div>
      <div className='ml-24'>
          <h3>Property Details</h3>
        </div>
      <div className="flex">
        {/* <div className="h-screen fixed top-0 left-0 mt-24 bg-gray-200">
          {/* SideBarListing component goes here */}
          {/* <SideBarListing activeItem="Listing Details" active="images" />
        </div> */} 
        
        <div className=" p-8">
          <div className='ml-24 mr-24'>
            <div className="w-full" id='images'>
              {/* ListingImages component goes here */}
              <ListingImages  />
            </div>
            <div className="w-full">
              {/* ListingBasics component goes here */}
              <ListingBasics  />
            </div>
            <div className="w-full">
              {/* ListingBasics component goes here */}
              <Location  />
            </div>
            <div className="w-full">
              {/* ListingBasics component goes here */}
              <RoomManage  />
            </div>
            <div className="w-full">
              {/* ListingBasics component goes here */}
              <PricePerNight  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePlace;
