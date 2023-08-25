import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { postAddProperty } from '../../../api/hostApi';

function PropertyDetails() {
  const [open, setOpen] = useState(false);
  const propertyDetails = useSelector((state) => state.propertyDetails);
  const {host} = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  const handleNavigation = () => {
    Swal.fire({
      title: 'Sorry, some of the data is incomplete',
      text: 'You need to add more details',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, continue!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/host/about-your-place');
      } else {
        navigate('/host');
      }
    });
  };

  const complete = async () => {
    // if (!host.details.phoneNumber) {
    //   Swal.fire({
    //     title: "Missing Phone Number",
    //     text: "Please provide your phone number before saving the property.",
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //   });
    // }
    try {
      Swal.fire({
        title: 'Please wait',
        text: 'Saving your property...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await postAddProperty(propertyDetails);
      console.log('response', response);
      if (response && response.data.error === false) {
        Swal.close();
        dispatch({ type: 'refresh' });
        navigate('/host');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error occurred during saving the property',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error occurred during API call',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.log('Error occurred during API call:', error);
    }
  }

  if (!propertyDetails.structure) {
    handleNavigation();
    return null;
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % propertyDetails.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + propertyDetails.images.length) % propertyDetails.images.length
    );
  };

  return (
    <div className="container mx-auto py-8">
    <h2 className="text-3xl font-bold mb-4">Property Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Basic Details</h3>
          <p>Structure: {propertyDetails.structure}</p>
          <p>Privacy Type: {propertyDetails.privacyType}</p>
          <p>Location: {propertyDetails.location}</p>
          {/* <p>Coordinates: {JSON.stringify(propertyDetails.coordinates)}</p> */}
          <p>Title: {propertyDetails.title}</p>
          {/* <p>Description: {propertyDetails.description}</p> */}
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">APleaseddress</h3>
          <p>Country: {propertyDetails.address.country}</p>
          <p>City: {propertyDetails.address.city}</p>
          <p>Post Code: {propertyDetails.address.postCode}</p>
          <p>Region: {propertyDetails.address.region}</p>
          <p>House Number: {propertyDetails.address.houseNumber}</p>
          <p>Area: {propertyDetails.address.area}</p>
          <p>Street Address: {propertyDetails.address.streetAddress}</p>
          <p>Landmark: {propertyDetails.address.landMark}</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Availability</h3>
          <p>Minimum Stay: {propertyDetails.minimumStay}</p>
          <p>Maximum Stay: {propertyDetails.maximumStay}</p>
          <p>
            Availability Dates between:
            Start: {JSON.stringify(propertyDetails.availability[0])}
            End: {JSON.stringify(propertyDetails.availability[1])}
          </p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Images</h3>
          <Card
            className="h-64 md:w-96 w-[23rem] cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
            onClick={handleOpen}
          >
            <img
              alt="nature"
              className="h-full w-full object-cover object-center"
              src={propertyDetails.images[0]}
            />
          </Card>
          <Dialog size="xl" open={open} handler={handleOpen}>
            <DialogBody divider={true} className="p-0">
              <div className="flex justify-between px-4 bg-transparent">
                <button onClick={handlePrevImage} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none">
                  Prev
                </button>
                <button onClick={handleNextImage} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none">
                  Next
                </button>
              </div>
              <div className="flex items-center justify-center h-[48rem] w-full">
                <img
                  alt={`Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover object-center"
                  src={propertyDetails.images[currentImageIndex]}
                />
              </div>


            </DialogBody>
          </Dialog>
        </div>
      </div>
      <button
        onClick={complete}
        className="bg-blue-500  text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Confirm
      </button>
    </div>
  );
}

export default PropertyDetails;
