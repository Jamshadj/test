import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import { Link } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import BookIcon from '@mui/icons-material/Book';
import { getBookingByHostId } from '../../../api/hostApi';
import RevenueCharts from '../../adminComponents/Charts/RevenueCharts';
import BookingCharts from '../../adminComponents/Charts/BookingCharts';

function Home() {
  const [bookingCount, setBookingCount] = useState(0);
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [completedBookingCount, setCompletedBookingCount] = useState(0);
  const [bookingData, setBookingData] = useState([]);

  const { details: hostDetails } = useSelector((state) => state.host);

  useEffect(() => {
    const getBookingsData = async () => {
      try {
        const response = await getBookingByHostId(hostDetails._id);

        setBookingData(response.data);
        setBookingCount(response.data.length);

        const pendingBookings = response.data.filter(booking => booking.status === 'Booked');
        setPendingBookingCount(pendingBookings.length);

        const completedBookings = response.data.filter(booking => booking.status === 'CheckOut completed');
        setCompletedBookingCount(completedBookings.length);
      } catch (error) {
        console.error(error);
      }
    };

    getBookingsData();
  }, [hostDetails._id]);

  return (
    <div className='md:w-full w-[378px]'>
      <HostNavbar />

      {/* Welcome and Complete Your Listing */}
      <div className="md:flex md:justify-between md:items-center md:pl-36 pt-12">
        <h2>Welcome {hostDetails.firstName}!</h2>
        <Link to="/host/about-your-place">
        <button className="md:ml-[2rem] listing mt-4 md:mt-0">Complete Your Listing</button>
        </Link>
      </div>
      <div className="md:flex md:pl-36 gap-4">
        <div className="bg-blue-gray-200 md:ml-0 ml-8 h-28 w-60  rounded-lg">
          <div className="m-8 md:p-0 p-6 ">
            <div>
              <BookIcon />
            </div>
            <div>
              Total Bookings: {bookingCount}
            </div>
          </div>
        </div>
        <div className="bg-blue-gray-200 h-28  md:ml-0 ml-8 w-60 rounded-lg">
          <div className="m-8 md:p-0 p-6">
            <div>
              <BookIcon />
            </div>
            <div>
              Pending Bookings: {pendingBookingCount}
            </div>
          </div>
        </div>
        <div className="bg-blue-gray-200 h-28 w-60  md:ml-0 ml-8 rounded-lg">
          <div className="m-8 md:p-0 p-6">
            <div>
              <BookIcon />
            </div>
            <div>
              Completed Bookings: {completedBookingCount}
            </div>
          </div>
        </div>
      </div>
      <div className='md:m-10'>
        {bookingData.length > 0 && (
          <div className='md:flex mt-28'>
            <div className='md:w-1/2 h-full w-full'>
              <h4>Revenue</h4>
              <RevenueCharts bookings={bookingData} />
            </div>
            <div className='md:w-1/3 md:ml-48'>
              <h4>Bookings</h4>
              <BookingCharts
                pendingBookingCount={pendingBookingCount}
                completedBookingCount={completedBookingCount}
                totalBookingCount={bookingCount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
