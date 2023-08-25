import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { getListings } from '../../../api/userApi';
import ListingCard from '../ListingCard/ListingCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Import useLocation

function Page() {
  const [listings, setListings] = useState([]);
  const { user } = useSelector((state) => state);
  const currentUser = user;

  const location = useLocation(); // Get the current location object
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category'); // Get the selected category from the URL parameter

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Pass the selected category to the getListings function
        const response = await getListings(selectedCategory);
        
        if (response && Array.isArray(response.data.listings)) {
          setListings(response.data.listings);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [selectedCategory]); // Trigger the effect whenever the selected category changes

  console.log("listing", listings);

  return (
    <Container>
      <div className='pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          listings.map(listing => (
            // Render ListingCard with individual listing data and provide a unique key prop.
            <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
          ))
        )}
      </div>
    </Container>
  );
}

export default Page;
  