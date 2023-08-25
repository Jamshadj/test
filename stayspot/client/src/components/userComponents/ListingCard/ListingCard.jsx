import React, { useState, useEffect } from 'react';
import HeartButton from './HeartButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom' for navigation

function ListingCard({ data, currentUser,filter }) {
  const [locationData, setLocationData] = useState(null);
  const navigate = useNavigate(); // Get the navigate function for navigation

  useEffect(() => {
    // Fetch the region and label using reverse geocoding
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.coordinates.longitude},${data.coordinates.latitude}.json`,
          {
            params: {
              access_token: process.env.REACT_APP_MAPBOX_API_KEY
            },
          }
        );
        setLocationData(response.data.features[0]);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };
    fetchLocationData();
  }, [data.coordinates]);

  const image = data.images[0];

  const navigateToRoomDetails = () => {
    // Navigate to the room details page with the corresponding _id
    navigate(`/rooms/${data._id}`);
  };

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={image}
            alt="Listing"  
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data._id} currentUser={currentUser} />
          </div>
        </div>
        <div  onClick={navigateToRoomDetails} >
        <div className="font-semibold text-lg h-14">
          {locationData ? `${locationData.text}` : 'Loading location...'}
        </div>
        {/* <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div> */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            ₹ {data.pricePerNight}
          </div>
          <div className="font-light">night</div>
        </div>
        </div>
      </div> 
    </div> 
  );
}

export default ListingCard;
