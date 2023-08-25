import React, { useEffect, useState } from 'react';
import { getUsers, getHosts, getBookings } from "../../../api/adminApi";
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import RevenueCharts from '../Charts/RevenueCharts';
import BookingCharts from '../Charts/BookingCharts';

function Home() {
  const [userCount, setUserCount] = useState(0);
  const [hostCount, setHostCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [completedBookingCount, setCompletedBookingCount] = useState(0);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const getUsersData = () => {
      getUsers()
        .then((response) => {
          setUserCount(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getHostsData = () => {
      getHosts()
        .then((response) => {
          setHostCount(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getBookingsData = () => {
      getBookings()
        .then((response) => {
          setBookingData(response.data);

          setBookingCount(response.data.length);

          const pendingBookings = response.data.filter(booking => booking.status === 'Booked');
          setPendingBookingCount(pendingBookings.length);

          const completedBookings = response.data.filter(booking => booking.status === 'CheckOut completed');
          setCompletedBookingCount(completedBookings.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUsersData();
    getHostsData();
    getBookingsData();
  }, []);

  return (
    <div className='m-10 md:ml-24 ml-12'>
       <div className="md:flex md:pl-36 gap-4">
        <div className="bg-blue-gray-200 md:ml-0 ml-8 h-28 w-60  rounded-lg">
          <div className="m-8 md:p-0 p-6 ">
            <div>
              <GroupIcon />
            </div>
            <div>
              Total User: {userCount}
            </div>
          </div>
        </div>
        <div className="bg-blue-gray-200 h-28  md:ml-0 ml-8 w-60 rounded-lg">
          <div className="m-8 md:p-0 p-6">
            <div>
              <GroupIcon />
            </div>
            <div>
              Total Hosts: {hostCount}
            </div>
          </div>
        </div>
        <div className="bg-blue-gray-200 h-28 w-60  md:ml-0 ml-8 rounded-lg">
          <div className="m-8 md:p-0 p-6">
            <div>
              <BookIcon />
            </div>
            <div>
              Total Bookings: {bookingCount}
            </div>
          </div>
        </div>
        <div className="bg-blue-gray-200 h-28 w-60  md:ml-0 ml-8 rounded-lg">
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
      {bookingData.length > 0 && (
       <div className='md:flex mt-28'>
       <div className='md:w-1/2 h-full w-[90%]'>
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
  );
}

export default Home;
