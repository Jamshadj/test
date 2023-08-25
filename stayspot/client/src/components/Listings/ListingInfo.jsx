import React from 'react';
import { RxAvatar } from 'react-icons/rx';
import ListingCategory from './ListingCategory';
import Map from './Map';
import ListingAmentie from './ListingAmentie';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../api/chatRequests';

function ListingInfo({ user, amenities, category, description, floorplan, locationValue, host }) {
  const navigate = useNavigate()
 console.log("user",user);
 console.log("host",host);
 
const handlenavigate = async () => {
  if (user.details && host) {
    console.log("ggg");
    try {
      const response = await createChat({
        userId: user.details._id,
        hostId: host._id,
      });
      navigate('/chat');
    } catch (error) {
      console.log(error);
    }
  }
};
  console.log("am", amenities);
  return (
    <div className='col-span-4 flex flex-col gap-8 overflow-y-auto'>
      <div className='flex items-center gap-4'>
        {host?.image ? (
          <img src={host?.image} alt='Host Avatar' className='w-8 h-8 rounded-full' />
        ) : (
          <RxAvatar />
        )}
        <div className='flex flex-col'>
          <span className='text-xl font-semibold'>
            Hosted by {host?.firstName} {host?.lastName}
          </span>
        </div>
      </div>
      <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
        {floorplan.map((item, index) => (
          <div key={index}>
            {item.count} {item.type}
          </div>
        ))}
      </div>
      <div>
        {host && (
          <button
            onClick={handlenavigate}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Message Host
          </button>
        )}


      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      {amenities && (
        <ListingAmentie
          amenities={amenities}
        />
      )}
      {/* 
        <Listi
          icon={amenities.icon}
          label={amenities?.label}
          description={amenities?.description}
        />
       
      */}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        <h6>Decription</h6>
        {description}
      </div>
      <hr />
      <Map center={locationValue} />
    </div>
  );
}

export default ListingInfo;
