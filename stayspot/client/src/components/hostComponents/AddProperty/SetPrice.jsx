import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { postAddProperty } from '../../../api/hostApi';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function SetPrice() {
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { host } = useSelector((state) => state);

  const handleNext = async () => {
    try {
      if (price.trim() === '') {
        setError('Price is required');
        return;
      }

      if (isNaN(parseFloat(price))) {
        setError('Price must be a number');
        return;
      }

      dispatch({
        type: 'propertyDetails',
        payload: { pricePerNight: price, hostId: host.details._id },
      });

      navigate('/host/property-details-page');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error occurred during API call',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.log('Error occurred during API call:', error);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <HostNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Now set your price</h2>
          <p>You can change it any time</p>
          <p>Price per night</p>
        </div>
        <input
          style={{
            border: 'black solid 0.5px',
            fontSize: '26px',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
          type="text"
          className="mt-10 h-48 w-full border-black"
          value={price}
          onChange={handlePriceChange}
        />
        {error && <p className="text-red-500">{error}</p>}
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default SetPrice;
