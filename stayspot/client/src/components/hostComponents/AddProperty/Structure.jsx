import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import categoriess from './StructureData'; // Import the categories array with types and corresponding icons
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';

function Structure() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const rows = Math.ceil(categoriess.length / 4); // Calculate the number of rows needed
  const navigate = useNavigate();

  // Function to handle category button click
  const handleClick = (categoryType) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryType ? null : categoryType
    );
  };

  // Function to handle the Next button click
  const handleNext = () => {
    console.log(selectedCategory,"de");
    if (selectedCategory) {
      // If a category is selected, proceed to the next step
      dispatch({ type: 'propertyDetails', payload: { structure: selectedCategory } });
      navigate('/host/privacy-type'); // Navigate to the privacy type page
    } else {
      // If no category is selected, show a SweetAlert warning
      showSelectCategoryAlert();
    }
  };

  // Function to show a SweetAlert warning for selecting a category
  const showSelectCategoryAlert = () => {
    Swal.fire({
      title: 'Select Category',
      text: 'Please select a category that best describes your place.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
      <HostNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Which of these best describes your place?</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriess.map((category, index) => (
            <button
              onClick={() => handleClick(category.label)} // Use the category label for click handler
              key={index}
              className={`flex flex-col items-center justify-center border p-4 rounded-lg transition-colors duration-300 ease-in-out focus:bg-blue-gray-200 ${
                category.label === selectedCategory ? 'bg-blue-200' : ''
              }`}
            >
              <div className="text-4xl mb-2">{<category.icon></category.icon>}</div>
              <p className="font-medium text-center">{category.label}</p>
            </button>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} disabled={selectedCategory === null} />
      </footer>
    </div>
  );
}

export default Structure;
