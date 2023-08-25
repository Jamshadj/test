import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from '../../../../axios';

function PricePerNight() {
  const { propertyDetails } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [editedPricePerNight, setEditedPricePerNight] = useState(propertyDetails.pricePerNight);

  const handleEditPrice = () => {
    setEditedPricePerNight(propertyDetails.pricePerNight);
    setShowPriceModal(true);
  };

  const handlePricePerNightChange = (event) => {
    const { value } = event.target;
    setEditedPricePerNight(value);
  };

  const handleSavePricePerNight = async () => {
    try {
      await axios.post('/host/update-price', {
        propertyId: propertyDetails._id,
        pricePerNight: editedPricePerNight,
      });
      setShowPriceModal(false);
      dispatch({
        type: 'propertyDetails',
        payload: {
          pricePerNight: editedPricePerNight,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Price per night updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error occurred during updating price per night:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='mt-3'>
        <div>
          <h6>
            Price Per Night
            <a href='#' onClick={handleEditPrice} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.pricePerNight}</p>
          <hr />
        </div>
      </div>

      {showPriceModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Price Per Night</h6>
            <div>
              <label>Price Per Night</label>
              <input
                type='number'
                name='pricePerNight'
                value={editedPricePerNight}
                onChange={handlePricePerNightChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowPriceModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSavePricePerNight} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricePerNight;
