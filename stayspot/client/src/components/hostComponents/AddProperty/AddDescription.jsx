import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';
import { useDispatch } from 'react-redux';

function AddDescription() {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (description.trim() === '') {
      setError('Description required');
      console.log('Description is empty');
      return;
    }

    dispatch({ type: 'propertyDetails', payload: { description: description } });
    navigate('/host/step-3');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <HostNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Create your description</h2>
          <p>Share what makes your place special</p>
        </div>
        <textarea
          rows={4}
          style={{
            border: '1px solid black',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
          type="text"
          className="mt-10 h-48 w-full border-black"
          value={description}
          onChange={handleDescriptionChange}
        />
        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default AddDescription;
