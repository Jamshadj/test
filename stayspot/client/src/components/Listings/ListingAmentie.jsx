import React from 'react';
import { IconType } from 'react-icons'; // Import the appropriate icon library

function ListingAmentie({ amenities }) {
  return (
    <div className="flex flex-col gap-6">
         <span className='text-xl font-semibold'>
            What this place offers
         </span>
      {amenities.map((data) => (
        <div className="flex flex-row items-center gap-4" key={data.label}>
          {/* Use the Icon component directly with the icon name */}
          {data.icon && <data.icon size={90} className="text-neutral-600" />}
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{data.label}</div>
            <div className="text-neutral-500 font-light">{data.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListingAmentie;
 