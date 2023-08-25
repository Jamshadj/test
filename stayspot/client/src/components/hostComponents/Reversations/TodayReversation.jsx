import React, { useEffect, useState } from 'react';
import { AiOutlineSelect } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { getBookingByHostId } from '../../../api/hostApi';
import { getListingById } from '../../../api/userApi';
import { getUserById } from '../../../api/adminApi';
import { useNavigate } from 'react-router-dom';

function TodayReservation() {
  const { host } = useSelector((state) => state);
  const [bookingData, setBookingData] = useState([]);
  const [listings, setListings] = useState({});
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

   const navigateToDetails = (bookingId) => {
    navigate(`reservationDetails/${bookingId}`);
  };
  const getBookingData = async () => {
    try {
      const response = await getBookingByHostId(host.details._id);
      const today = new Date().setHours(0, 0, 0, 0);
      const filteredBookings = response.data.filter((booking) => {
        const checkInDate = new Date(booking.checkInDate).setHours(0, 0, 0, 0);
        const checkOutDate = new Date(booking.checkOutDate).setHours(0, 0, 0, 0);
        return checkInDate <= today && checkOutDate >= today;
      });
      setBookingData(filteredBookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookingData();
  }, [host.details._id]);

  useEffect(() => {
    if (bookingData.length > 0) {
      const listingIds = bookingData.map((booking) => booking.listingId);
      const userIDs = bookingData.map((booking) => booking.userId);

      Promise.all([
        Promise.all(listingIds.map((listingId) => getListingById(listingId))),
        Promise.all(userIDs.map((userId) => getUserById(userId))),
      ])
        .then(([listingResponses, userResponses]) => {
          const listingsData = {};
          listingResponses.forEach((response) => {
            listingsData[response.data._id] = response.data;
          });

          const usersData = {};
          userResponses.forEach((response) => {
            usersData[response.data._id] = response.data;
          });

          setListings(listingsData);
          setUsers(usersData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [bookingData]);

  return (
    <div className="card w-5/6 mx-auto mt-8 " style={{ backgroundColor: 'rgb(243 243 243)', height: '22rem' }}>
      <div className="card-body ">
        
        {bookingData.length === 0 ? (
          <>
          <h2 className="card-title mx-auto ">
          <AiOutlineSelect />
        </h2>
          <p className="mx-auto">You don't have any guests today</p>
          </>
        ) : (
          <div className="flex gap-4">
            {bookingData.map((booking) => (
  <div key={booking._id} className="max-w-sm w-full lg:max-w-full lg:flex" onClick={() => navigateToDetails(booking._id)}>
                    <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url('${listings[booking.listingId]?.images[0]}')` }} title="Listing Image">
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                      </svg>
                      {booking.status}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{listings[booking.listingId]?.title}</div>
                    <p className="text-gray-700 text-base">{listings[booking.listingId]?.description}</p>
                  </div>
                  <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={users[booking.userId]?.image} alt="Avatar" />
                    <div className="text-sm">
                      <p className="text-gray-900 leading-none">{users[booking.userId]?.firstName}</p>
                      <p className="text-gray-600">{booking.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodayReservation;
