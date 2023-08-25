import React, { useState } from 'react';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import amenities from './AmenitiesData';

function Amenities() {
  

  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const rows = Math.ceil(amenities.length / 4); // Calculate the number of rows needed
  const navigate = useNavigate();

  const handleClick = (categoryType) => {
    // Toggle the category selection
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryType)
        ? prevCategories.filter((category) => category !== categoryType)
        : [...prevCategories, categoryType]
    );
  };

  const handleNext = () => {

      // Dispatch action and navigate to the next step
      console.log(selectedCategories);
      dispatch({ type: 'propertyDetails', payload: { amenities: selectedCategories } });
      navigate('/host/add-images');

  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Tell guests what Your place has to offer</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((category, index) => (
            <button
              onClick={() => handleClick(category.label)}
              key={index}
              className={`flex flex-col items-center justify-center border p-4 rounded-lg transition-colors duration-300 ease-in-out focus:bg-blue-gray-200 ${
                selectedCategories.includes(category.label) ? 'bg-blue-200' : ''
              }`}
            >
              <div className="text-4xl mb-2"><category.icon/></div>
              <p className="font-medium text-center">{category.label}</p>
            </button>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} disabled={selectedCategories.length === 0} />
      </footer>
    </div>
  );
}

export default Amenities;
