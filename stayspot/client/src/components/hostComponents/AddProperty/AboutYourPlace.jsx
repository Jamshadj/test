import React from 'react';
import { useNavigate } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import home from '../../../assets/animation/home.png';
import Footer from './Footer';
import Structure from './Structure';

function AboutYourPlace() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/host/structure');
  };

  return (
    <div className="flex flex-col min-h-screen">
    <HostNavbar />
    <div className="flex-grow mx-auto w-full md:flex md:flex-row justify-center items-center p-4 md:p-10">
      <div className="w-full md:w-1/2 md:ml-10 mb-6 md:mb-0">
        <div className="p-4 md:p-8 lg:p-10">
          <h5 className="text-xl lg:text-2xl">Step 1</h5>
          <h2 className="text-2xl lg:text-4xl mt-2">Tell about your place</h2>
          <p className="text-sm lg:text-base mt-2">
            In this step, we'll ask you which type of property you have and if guests will book the entire place or just
            a room. Then let us know the location and how many guests can stay.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img src={home} alt="" className="md:mx-auto w-[22rem] md:w-auto lg:w-3/4" />
      </div>
    </div>
    <Footer onNext={handleNext} />
  </div>
  );
}

export default AboutYourPlace;
