import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Container from '../userComponents/Container';
import Logo from '../userComponents/Navbar/Logo';
import Search from '../userComponents/Navbar/Search';
import UserMenu from '../userComponents/Navbar/UserMenu';
import { getListingById } from '../../api/userApi';
import ListingClient from './ListingClient';
import { useSelector } from 'react-redux';

function Page() {
  const { propertyId } = useParams(); // Use destructuring to get propertyId from the URL params
  const [listing, setListing] = useState(null); // State to store the fetched listing
  const { user } = useSelector((state) => state);
  const currentUser=user;
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(propertyId);
        console.log(response);
        if (response && response.data) {
          setListing(response.data); // Set the fetched listing in the state
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [propertyId]); // Add propertyId to the dependency array

  // Render loading message until the listing data is fetched
  if (!listing) {
    return (
      <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-3 ' style={{ border: 'solid black 0.2px' }}>
          <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
              <Logo />
              <Search />
              <UserMenu />
            </div>
          </Container>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  // Render the component content once the listing data is available
  return (
    <div className='w-full bg-white z-10 shadow-sm'>
      <div className='py-3 ' style={{ border: 'solid black 0.2px' }}>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    <ListingClient listing={listing} currentUser={currentUser}/>
    </div>
  );
}

export default Page;
