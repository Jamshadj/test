import React from 'react';
import { useSelector } from 'react-redux';

function ListingImages() {
  // Access the propertyDetails state from the Redux store
  const { propertyDetails } = useSelector((state) => state);

  // If propertyDetails is not available yet (still loading), show a loading state
  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Image section title */}
      <div className='flex items-center justify-between mb-4'>
        <h5>Photos</h5>
        {/* Link to edit the images */}
        <a href='#' className='text-black hover:underline'>
          Edit
        </a>
      </div>
      <div className='flex overflow-x-auto gap-4'>
        {/* Render each image */}
        {propertyDetails.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className='w-64 h-56 object-cover'
          />
        ))}
       
      </div>
    </div>
  );
}

export default ListingImages;
