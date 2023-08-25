import React, { useState } from 'react';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';
import { BsDoorOpen, BsHouseDoor, BsShareFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert library

function Privacy() {
  // Categories array with types, descriptions, and icons
  const categories = [
    {
      type: 'A Entire place',
      description: 'Guest has the whole place to themselves',
      icon: <BsHouseDoor />,
    },
    {
      type: 'A room',
      description: 'Guest has their own room in the home, plus access to shared places',
      icon: <BsDoorOpen />,
    },
    {
      type: 'A shared room',
      description: 'Guest sleeps in a room or common area that may be shared with others',
      icon: <BsShareFill />,
    },
    // Add more categories as needed
    // ...
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [privacyType, setPrivacyType] = useState('');

  // Function to handle the Next button click
  const handleNext = () => {
    if (privacyType) {
      // If a privacy type is selected, proceed to the next step
      dispatch({ type: 'propertyDetails', payload: { privacyType: privacyType } });
      navigate('/host/location');
    } else {
      // If no privacy type is selected, show a SweetAlert warning
      showSelectPrivacyTypeAlert();
    }
  };

  // Function to show a SweetAlert warning for selecting a privacy type
  const showSelectPrivacyTypeAlert = () => {
    Swal.fire({
      title: 'Select Privacy Type',
      text: 'Please select a privacy type that best describes your place.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
    <HostNavbar />
    <div className="flex-grow mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16">
      <div>
        <h2 className="pt-3 text-2xl md:text-3xl font-bold">Which of these best describes your place?</h2>
      </div>
      <div className="mt-10 grid gap-6 md:gap-8 lg:gap-10 justify-items-start">
        {categories.map((category, index) => (
          <button
            onClick={() => setPrivacyType(category.type)}
            key={index}
            className="flex items-center justify-between border border-gray-900 p-4 md:p-6 lg:p-8 rounded-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out w-full focus:bg-blue-gray-200"
          >
            <div>
              <p className="font-medium text-sm md:text-base">{category.type}</p>
              <p className="w-full text-xs md:text-sm lg:w-80">{category.description}</p>
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl">{category.icon}</div>
          </button>
        ))}
      </div>
    </div>
    <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
      <Footer onNext={handleNext} disabled={privacyType === ''} />
    </footer>
  </div>
  );
}

export default Privacy;
