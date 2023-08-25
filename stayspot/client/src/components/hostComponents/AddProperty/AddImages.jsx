import React, { useState } from 'react';
import HostNavbar from '../HostNavBar/HostNavbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function AddImages() {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidFileUploaded = (file) => {
    const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleNext = () => {
    // Dispatch the images to the Redux store
    dispatch({ type: 'propertyDetails', payload: { images: selectedImages } });
    navigate('/host/add-title');
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const imageList = Array.from(files);

    const isValidImages = imageList.every((file) => isValidFileUploaded(file));

    if (isValidImages) {
      Promise.all(imageList.map(convertToBase64))
        .then((base64Images) => setSelectedImages(base64Images))
        .catch((error) => console.log('Error converting images to base64:', error));
    } else {
      console.log('Invalid File type');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
    <header className="fixed top-0 left-0 w-full z-10 bg-white">
      <HostNavbar />
    </header>
    <main className="flex-grow mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16 xl:px-32 mt-16">
      <div className='mt-20'>
        <h2 className="pt-3 text-2xl md:text-3xl font-bold">Add some images of your place</h2>
      </div>
      <div className="flex flex-wrap justify-center mt-6">
          {selectedImages.map((image, index) => (
            <div key={index} className="max-w-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 m-4">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-48 md:h-64 xl:h-80 rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full mt-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default AddImages;
