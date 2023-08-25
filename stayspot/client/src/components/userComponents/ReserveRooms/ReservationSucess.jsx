import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Button } from '@mui/material';
import confirmLogo from '../../../assets/verificationimg/360_F_549387387_RCkqVtf2t5PbNYGQgQEHZMpFuHbpTvJz.webp';
import { Link, useLocation } from 'react-router-dom';
import { getBookingById, getListingById } from '../../../api/userApi';

function ReservationSucess() {
  const location = useLocation();
  const bookingId = new URLSearchParams(location.search).get('bookingId');
  const [booking, setBooking] = useState(null);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingResponse = await getBookingById(bookingId);
        console.log(bookingResponse.data, "booking");
        setBooking(bookingResponse.data.booking);

        if (bookingResponse.data.booking) {
          const listingResponse = await getListingById(bookingResponse.data.booking.listingId);
          console.log(listingResponse.data, "listing");
          setListing(listingResponse.data);
          console.log(listing,"jjkjj");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [bookingId]);
 
  return (
    <div>
      <Navbar reservation={true} />
      <div className='pt-28'>
        <div className='mx-40'>
          <div className='mx-auto text-center'>
            <span className='text-center text-black text-2xl font-bold'>Booking confirmed successfully</span>
          </div>
          <div className='items-center flex justify-center'>
            <img src={confirmLogo} alt="" />
          </div>
          <div className='text-center'>
            <span>
              Booking ID: {bookingId}
            </span>
          </div>
          <div className='flex mt-6 justify-center'>
            <div>
              {listing && <img src={listing.images[0]} className='w-20 h-20' alt="" />}
            </div>
            <div>
              <div>

              <span className='text-center pl-4'>{listing ? listing.title : ''}</span>
              </div>
              <div>

              <span className='text-center pl-4'>{listing ? listing.location : ''}</span>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex gap-4'>
              <Link to={"/"}    >         <div>
                <Button className='blue'>Go to Home</Button>
              </div></Link> 
              {/* <div>
                <Button className='blue'>Go to reservations</Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationSucess;
