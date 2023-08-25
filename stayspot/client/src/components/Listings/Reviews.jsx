import React, { useEffect, useState } from 'react';
import { getBookingByPropertyId } from '../../api/userApi';
import { Rating } from "@material-tailwind/react";

function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookingByPropertyId(id);
        const fetchedReviews = response.data.bookings || [];
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Rating and Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div>
          {reviews.map((booking, index) => (
            <div key={index} className='md:flex my-4'>
              <div style={{ flex: 1 }}>
                <div className='flex'>
                  <img src={booking.userId && booking.userId.image} style={{width:"30px",height:"30px"}} alt="" />
                  <p className='pl-4'>{booking.userId && booking.userId.firstName}</p>
                </div>
              </div>
              <div >
                <Rating value={booking.review[0] && booking.review[0].starCount} readonly />
              </div>
              <div className='md:flex-1 md:text-right'>
                <input type="text" readOnly value={booking.review[0] && booking.review[0].comment} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
