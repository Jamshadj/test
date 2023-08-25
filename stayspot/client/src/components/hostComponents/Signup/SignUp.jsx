import React, { useState } from 'react';
import SignUpCardImage from './SIgnUpCardImage';
import SignUpCard from './SignUpCard';
import Navbar from '../Login/Navbar';

function SignUp() {
 

  return (
    <div>
    <Navbar />
    <hr />
    <div className="flex flex-col md:flex-row mt-11">
        <div className="md:w-1/2 ">
        <SignUpCardImage />
      </div>
      <div className=" md:w-1/2">
        <SignUpCard />
      </div>
    </div>
  </div>
  );
}

export default SignUp;
 