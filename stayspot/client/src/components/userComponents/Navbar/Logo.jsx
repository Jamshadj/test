import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Image from './image.png'
import Image from '../../../assets/logo/logo.png'
function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/host');
  };

  return (
    <img
      onClick={handleLogoClick}
      className=" md:block cursor-pointer" 
      src={Image} 
      height="20" 
      width="40" 
      alt="Logo" 
    />
   
      );
}

export default Logo;
