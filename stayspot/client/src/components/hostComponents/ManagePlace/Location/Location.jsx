import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from '../../../../axios';

function Location() {
  const dispatch = useDispatch();
  const { propertyDetails } = useSelector((state) => state);

  const [showModal, setShowModal] = useState(false);

  // State to manage the edited address fields
  const [editedAddress, setEditedAddress] = useState({
    ...propertyDetails.address, // Use the spread operator to copy the values from propertyDetails.address
  });

  // Function to handle opening the modal and pre-filling the address fields
  const handleEditAddress = () => {
    setEditedAddress({ ...propertyDetails.address }); // Use the spread operator to copy the values from propertyDetails.address
    setShowModal(true);
  };

  // Function to handle changes in the address fields
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setEditedAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  // Function to handle saving the edited address
  const handleSaveAddress = async () => {
    try {
      const response = await axios.post('/host/edit-address', {
        editedAddress,
        propertyId: propertyDetails._id,
      });

      console.log('Data update response:', response.data);

      if (response.data.success) {
        dispatch({
          type: 'propertyDetails',
          payload: {
            address: editedAddress,
          },
        });
        setShowModal(false);

        Swal.fire({
          icon: 'success',
          title: 'Data updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
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
      <h5 className='mt-3'>Location</h5>
      <div className='mt-3'>
        <div>
          <h6>
            <button onClick={handleEditAddress} className='text-black hover:underline float-right'>
              Edit
            </button>
          </h6>
          <p>{propertyDetails.location}</p>
          <hr />
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Address</h6>
            {/* The address input fields */}
            <div>
              <label>Country</label>
              <input
                type='text'
                name='country'
                value={editedAddress.country}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type='text'
                name='country'
                value={editedAddress.country}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>City</label>
              <input
                type='text'
                name='city'
                value={editedAddress.city}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>Post Code</label>
              <input
                type='text'
                name='postCode'
                value={editedAddress.postCode}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>Region</label>
              <input
                type='text'
                name='region'
                value={editedAddress.region}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>House Number</label>
              <input
                type='text'
                name='houseNumber'
                value={editedAddress.houseNumber}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>Area</label>
              <input
                type='text'
                name='area'
                value={editedAddress.area}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>Street Address</label>
              <input
                type='text'
                name='streetAddress'
                value={editedAddress.streetAddress}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div>
              <label>Landmark</label>
              <input
                type='text'
                name='landMark'
                value={editedAddress.landMark}
                onChange={handleAddressChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSaveAddress} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
