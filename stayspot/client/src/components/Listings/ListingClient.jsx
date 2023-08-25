import React, { useEffect, useState } from 'react';
import Container from '../userComponents/Container';
import ListingHead from './ListingHead';
import categories from '../hostComponents/AddProperty/StructureData';
import amenities from '../hostComponents/AddProperty/AmenitiesData';
import ListingInfo from './ListingInfo';
import Calendar from './Calendar';

import { getHostById } from '../../api/userApi'; // Make sure to have the getHostById function implemented in the userApi file or elsewhere.
import { fetchLocationData } from '../../constant/Mapbox';
import CheckAvaliablityCard from './CheckAvaliablityCard';

import Reviews from './Reviews';

function ListingClient({ listing, currentUser }) {
  const category = categories.find((item) => item.label === listing.structure);
  const amenitiess = amenities.filter((item) => listing.amenities.includes(item.label));

  const [locationData, setLocationData] = useState(null);
  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchListingLocationData = async () => {
      const locationData = await fetchLocationData(listing.coordinates);
      setLocationData(locationData);
    };

    fetchListingLocationData();
  }, [listing.coordinates]);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        const response = await getHostById(listing.hostId);
        setHost(response.data);
      } catch (error) {
        console.error('Error fetching host data:', error); // Corrected the error message
      }
    };

    fetchHostData();
  }, [listing.hostId]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div>
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.images}
              locationValue={locationData}
              id={listing._id}
              currentUser={currentUser}
            />
            <div className=" md:flex">
              <div className=" md:w-1/2 mt-6">
                <ListingInfo
                  user={currentUser}
                  category={category}
                  amenities={amenitiess}
                  description={listing.description}
                  floorplan={listing.floorPlan}
                  locationValue={listing.coordinates}
                  host={host}
                />
                {/* <Calendar/> */}
              </div>
              <div className=" md:w-1/3 md:ml-[8%] mr-0 mb-2">
              <CheckAvaliablityCard listing={listing} />
              </div>
            </div>
            <hr />
            <div className="mb-6"> {/* Add a margin-bottom to create spacing */}
              <Reviews id={listing._id} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
