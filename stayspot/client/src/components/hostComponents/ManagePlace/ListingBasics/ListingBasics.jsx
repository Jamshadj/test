import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../../axios';
import { GrClose } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ListingBasics() {
  const { propertyDetails } = useSelector((state) => state);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  const [changedTitle, setChangedTitle] = useState(propertyDetails.title);
  const [changedDescription, setChangedDescription] = useState(propertyDetails.description);
  const [changedStatus, setChangedStatus] = useState(propertyDetails.status);
  const { propertyId } = useParams();
  const dispatch = useDispatch();

  // Check if propertyDetails is available before rendering
  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  // Handle title editing
  const handleTitleEdit = () => {
    setEditTitle(true);
    setChangedTitle(propertyDetails.title);
  };

  // Handle description editing
  const handleDescriptionEdit = () => {
    setEditDescription(true);
    setChangedDescription(propertyDetails.description);
  };

  // Handle status editing
  const handleStatusEdit = () => {
    setEditStatus(true);
    setChangedStatus(propertyDetails.status);
  };

  // Handle title change
  const handleTitleChange = (event) => {
    // Limit the title to 50 characters
    if (event.target.value.length <= 50) {
      setChangedTitle(event.target.value);
    }
  };

  // Handle description change
  const handleDescriptionChange = (event) => {
    setChangedDescription(event.target.value);
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setChangedStatus(event.target.value);
  };

  console.log("deed",
    changedTitle,
    changedDescription,
    changedStatus
  );

  // Handle Save button click
  const handleSave = async () => {
    try {
      // Send the updated data to the backend using Axios (replace '/host/edit-data' with the actual endpoint URL)
      const response = await axios.post('/host/edit-data', {
        propertyId,
        title: changedTitle,
        description: changedDescription,
        status: changedStatus,
      });

      console.log('Data update response:', response.data);

      // If the data update is successful, set the edited data in the propertyDetails
      if (response.data.success) {
        dispatch({
          type: 'propertyDetails',
          payload: {
            title: changedTitle,
            description: changedDescription,
            status: changedStatus,
          },
        });        
        setEditTitle(false);
        setEditDescription(false);
        setEditStatus(false);

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

  // Handle Cancel button click
  const handleCancel = () => {
    setEditTitle(false);
    setEditDescription(false);
    setEditStatus(false);

    // Reset the changed states to their original values
    setChangedTitle(propertyDetails.title);
    setChangedDescription(propertyDetails.description);
    setChangedStatus(propertyDetails.status);
  };

  return (
    <div >
      <h5 className='mt-3'>Listing Basics</h5>
      <div className='mt-3'>
        {/* Edit Title */}
        {editTitle ? (
          // Edit mode for title
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Listing Title
              <p onClick={() => setEditTitle(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <p className='pl-4 text-sm'>Your listing title should highlight what makes your place special.</p>
            <div className='m-4'>
              <input
                type='text'
                value={changedTitle}
                onChange={handleTitleChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='pl-4 text-xs text-gray-500 mt-[-27px]'>
              <p className='ml-4 mt-3 text-black'>
                {changedTitle.length}/50
                {changedTitle.length > 50 && (
                  <span className='text-red-600'> (Exceeded 50 characters limit)</span>
                )}
              </p>
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedTitle || changedTitle === propertyDetails.title}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedTitle || changedTitle === propertyDetails.title ? 'cursor-not-allowed' : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          // View mode for title
          <div>
            <h6>
              Listing Title
              <a href='#' onClick={handleTitleEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.title}</p>
            <hr />
          </div>
        )}

        {/* Edit Description */}
        {editDescription ? (
          // Edit mode for description
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Listing Description
              <p onClick={() => setEditDescription(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <div className='m-4'>
              <textarea
                value={changedDescription}
                onChange={handleDescriptionChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows={4}
              />
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedDescription || changedDescription === propertyDetails.description}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedDescription || changedDescription === propertyDetails.description ? 'cursor-not-allowed' : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          // View mode for description
          <div>
            <h6>
              Listing Description
              <a href='#' onClick={handleDescriptionEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.description}</p>
            <hr />
          </div>
        )}
        
        {/* Edit Listing Status */}
        {editStatus ? (
          // Edit mode for status
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Listing Status
              <p onClick={() => setEditStatus(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <div className='m-4'>
              <select
                value={changedStatus}
                onChange={handleStatusChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
                <option value='Under Review'>Under Review</option>
              </select>
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedStatus || changedStatus === propertyDetails.status}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedStatus || changedStatus === propertyDetails.status ? 'cursor-not-allowed' : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          // View mode for status
          <div>
            <h6>
              Listing Status
              <a href='#' onClick={handleStatusEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.status}</p>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingBasics;
