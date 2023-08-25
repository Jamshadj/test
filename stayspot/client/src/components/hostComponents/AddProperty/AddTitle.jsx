import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';
import { useDispatch } from 'react-redux';

function AddTitle() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (title.trim() === '') {
      setError('Title required');
      console.log('Title is empty');
      return;
    }

    dispatch({ type: 'propertyDetails', payload: { title: title } });
    navigate('/host/add-description');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <HostNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Now let's give your place a title</h2>
          <p>Short title works best</p>
        </div>
        <textarea
          style={{
            border: '1px solid black',
            fontSize: '26px',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
          rows={4}
          type="text"
          className="mt-10 h-48 w-full border-black"
          value={title}
          onChange={handleTitleChange}
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

export default AddTitle;
