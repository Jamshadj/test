import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from '../../../../axios'; // Make sure to install axios using `npm install axios`

function RoomManage() {
  const { propertyDetails } = useSelector((state) => state);

  const [showStructureModal, setShowStructureModal] = useState(false);
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  const [showPrivacyTypeModal, setShowPrivacyTypeModal] = useState(false);
  const [editedStructure, setEditedStructure] = useState(propertyDetails.structure);
  const [editedGuest, setEditedGuest] = useState(propertyDetails.floorPlan[0].count);
  const [editedBedRoom, setEditedBedRoom] = useState(propertyDetails.floorPlan[1].count);
  const [editedBathroom, setEditedBathroom] = useState(propertyDetails.floorPlan[2].count);
  const [editedBeds, setEditedBeds] = useState(propertyDetails.floorPlan[3].count);
  const [editedPrivacyType, setEditedPrivacyType] = useState(propertyDetails.privacyType);
  const dispatch=useDispatch()
  const handleEditStructure = () => {
    setEditedStructure(propertyDetails.structure);
    setShowStructureModal(true);
  };

  const handleStructureChange = (event) => {
    const { value } = event.target;
    setEditedStructure(value);
  };
  const handleEditPrivacyType = () => {
    setEditedPrivacyType(propertyDetails.privacyType);
    setShowPrivacyTypeModal(true);
  };

  const handlePrivacyTypeChange = (event) => {
    const { value } = event.target;
    setEditedPrivacyType(value);
  };

  const handleSaveStructure = async () => {
    try {
      await axios.post('/host/update-property-field', {
        propertyId: propertyDetails._id,
        fieldName: 'structure',
        fieldValue: editedStructure,
      });
      setShowStructureModal(false);
      dispatch({
        type: 'propertyDetails',
        payload: {
          structure:editedStructure,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Structure updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error occurred during updating structure:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleSaveFloorPlan = async () => {
    try {
      const updatedFloorPlan = [
        { type: 'Guest', count: editedGuest, _id: propertyDetails.floorPlan[0]._id },
        { type: 'Bedrooms', count: editedBedRoom, _id: propertyDetails.floorPlan[1]._id },
        { type: 'Bathroom', count: editedBathroom, _id: propertyDetails.floorPlan[2]._id },
        { type: 'Beds', count: editedBeds, _id: propertyDetails.floorPlan[3]._id },
      ];
  
      await axios.post('/host/update-property-field', {
        propertyId: propertyDetails._id,
        fieldName: 'floorPlan',
        fieldValue: updatedFloorPlan,
      });
  
      setShowFloorPlanModal(false);
  
      // Assuming you have a dispatch function from react-redux to update propertyDetails
      dispatch({
        type: 'propertyDetails',
        payload: {
          floorPlan: updatedFloorPlan,
        },
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Floor plan updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error occurred during updating floor plan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  
  const handleSavePrivacyType = async () => {
    try {
      await axios.post('/host/update-property-field', {
        propertyId: propertyDetails._id,
        fieldName: 'privacyType',
        fieldValue: editedPrivacyType,
      });
      setShowPrivacyTypeModal(false);
      dispatch({
        type: 'propertyDetails',
        payload: {
          privacyType: editedPrivacyType,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Privacy type updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error occurred during updating privacy type:', error);
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
      <h5 className='mt-3'>Property and rooms</h5>
      <div className='mt-3'>
        <div>
          <h6>
            Structure
            <a href='#' onClick={handleEditStructure} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.structure}</p>
          <hr />
        </div>
      </div>
      <div className='mt-3'>
        <div>
          <h6>
            Floor plan
            <a href='#' onClick={() => setShowFloorPlanModal(true)} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          {propertyDetails.floorPlan.map((item, index) => (
            <p key={item._id}>
              {item.type}: {item.count}
            </p>
          ))}
          <hr />
        </div>
      </div>
      <div className='mt-3'>
        <div>
          <h6>
            Privacy Type
            <a href='#' onClick={handleEditPrivacyType} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.privacyType}</p>
          <hr />
        </div>
      </div>

      {showStructureModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Structure</h6>
            <div>
              <label>Structure</label>
              <input
                type='text'
                name='structure'
                value={editedStructure}
                onChange={handleStructureChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowStructureModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSaveStructure} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

{showFloorPlanModal && (
  <div className=' fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
    <div className='bg-white p-4 w-96 rounded-lg custom-modal-width'> {/* Add the custom class here */}
      <h6 className='font-bold'>Edit Floor Plan</h6>
    
      <div>
        <label>Guest</label>
        <input
          type='number'
          name='guest'
          value={editedGuest}
          onChange={(e) => setEditedGuest(e.target.value)}
          className='w-full border rounded-lg p-2'
        />
        <label>BedRoom</label>
        <input
          type='number'
          name='bedroom'
          value={editedBedRoom}
          onChange={(e) => setEditedBedRoom(e.target.value)}
          className='w-full border rounded-lg p-2'
        />
        <label>BathRoom</label>
        <input
          type='number'
          name='bathroom'
          value={editedBathroom}
          onChange={(e) => setEditedBathroom(e.target.value)}
          className='w-full border rounded-lg p-2'
        />
        <label>Beds</label>
        <input
          type='number'
          name='beds'
          value={editedBeds}
          onChange={(e) => setEditedBeds(e.target.value)}
          className='w-full border rounded-lg p-2'
        />
      </div>

      <div className='flex justify-end mt-4'>
        <button onClick={() => setShowFloorPlanModal(false)} className='mr-2'>
          Cancel
        </button>
        <button onClick={handleSaveFloorPlan} className='bg-blue-500 text-white rounded px-4 py-2'>
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {showPrivacyTypeModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Privacy Type</h6>
            <div>
              <label>Privacy Type</label>
              <input
                type='text'
                name='privacyType'
                value={editedPrivacyType}
                onChange={handlePrivacyTypeChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowPrivacyTypeModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSavePrivacyType} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomManage;
